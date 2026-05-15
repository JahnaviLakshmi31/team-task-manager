const db = require("../db/db");

const getDashboardData = (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;

    let totalTasksQuery;
    let statusQuery;
    let overdueQuery;
    let userTaskQuery;

    // ================= ADMIN =================
    if (role === "Admin") {

        totalTasksQuery = "SELECT COUNT(*) AS total FROM tasks";

        statusQuery = `
            SELECT status, COUNT(*) AS count
            FROM tasks
            GROUP BY status
        `;

        overdueQuery = `
            SELECT COUNT(*) AS overdue
            FROM tasks
            WHERE due_date < CURDATE() AND status != 'Done'
        `;

        userTaskQuery = `
            SELECT u.name, COUNT(t.id) AS task_count
            FROM users u
            LEFT JOIN tasks t ON u.id = t.assigned_to
            WHERE u.role != 'admin'
            GROUP BY u.id
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
    WHERE DATE(due_date) < CURDATE()
    AND status != 'Done'
`;

        userTaskQuery = `
            SELECT status, COUNT(*) AS count
            FROM tasks
            WHERE assigned_to = ?
            GROUP BY status
        `;
    }

    // ============== EXECUTION ==============
    const param = role === "Admin" ? [] : [userId];

    db.query(totalTasksQuery, param, (err, totalResult) => {
        if (err) return res.status(500).json({ message: "Error fetching total tasks" });

        db.query(statusQuery, param, (err2, statusResult) => {
            if (err2) return res.status(500).json({ message: "Error fetching status data" });

            db.query(overdueQuery, param, (err3, overdueResult) => {
                if (err3) return res.status(500).json({ message: "Error fetching overdue tasks" });

                db.query(userTaskQuery, param, (err4, userResult) => {
                    if (err4) return res.status(500).json({ message: "Error fetching user stats" });

                    return res.status(200).json({
                        totalTasks: totalResult[0].total,
                        statusBreakdown: statusResult,
                        overdueTasks: overdueResult[0].overdue,
                        userStats: userResult
                    });
                });
            });
        });
    });
};

module.exports = { getDashboardData };