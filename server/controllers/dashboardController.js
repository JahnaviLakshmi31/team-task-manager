const db = require("../db/db");

const getDashboardData = (req, res) => {

    const userId = req.user.id;

    const role = req.user.role;

    let totalTasksQuery = "";
    let statusQuery = "";
    let overdueQuery = "";
    let userTaskQuery = "";

    // ================= ADMIN =================
    if (role === "Admin") {

        totalTasksQuery = `
            SELECT COUNT(*) AS total
            FROM tasks
        `;

        statusQuery = `
            SELECT status, COUNT(*) AS count
            FROM tasks
            GROUP BY status
        `;

        overdueQuery = `
            SELECT COUNT(*) AS overdue
            FROM tasks
            WHERE due_date < CURDATE()
            AND status != 'Done'
        `;

        userTaskQuery = `
            SELECT users.name,
                   COUNT(tasks.id) AS task_count
            FROM users
            LEFT JOIN tasks
            ON users.id = tasks.assigned_to
            GROUP BY users.id
        `;
    }

    // ================= MEMBER =================
    else {

        totalTasksQuery = `
            SELECT COUNT(*) AS total
            FROM tasks
            WHERE assigned_to = ?
        `;

        statusQuery = `
            SELECT status, COUNT(*) AS count
            FROM tasks
            WHERE assigned_to = ?
            GROUP BY status
        `;

        overdueQuery = `
            SELECT COUNT(*) AS overdue
            FROM tasks
            WHERE assigned_to = ?
            AND due_date < CURDATE()
            AND status != 'Done'
        `;
    }

    // ================= ADMIN EXECUTION =================
    if (role === "Admin") {

        db.query(totalTasksQuery, (err1, totalResult) => {

            db.query(statusQuery, (err2, statusResult) => {

                db.query(overdueQuery, (err3, overdueResult) => {

                    db.query(userTaskQuery, (err4, userResult) => {

                        return res.json({
                            totalTasks: totalResult[0].total,
                            statusBreakdown: statusResult,
                            overdueTasks: overdueResult[0].overdue,
                            userStats: userResult
                        });

                    });

                });

            });

        });

    }

    // ================= MEMBER EXECUTION =================
    else {

        db.query(totalTasksQuery, [userId], (err1, totalResult) => {

            db.query(statusQuery, [userId], (err2, statusResult) => {

                db.query(overdueQuery, [userId], (err3, overdueResult) => {

                    return res.json({
                        totalTasks: totalResult[0].total,
                        statusBreakdown: statusResult,
                        overdueTasks: overdueResult[0].overdue,
                        userStats: []
                    });

                });

            });

        });

    }

};

module.exports = { getDashboardData };