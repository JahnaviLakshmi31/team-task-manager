const db = require("../db/db");

// CREATE TASK (ADMIN ONLY + validation)
const createTask = (req, res) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Only Admin can create tasks" });
    }

    const {
        title,
        description,
        priority,
        due_date,
        project_id,
        assigned_to
    } = req.body;

    const status = "Todo";
    const created_by = req.user.id;

    // STEP 1: check if user is part of project
    const checkMember = `
        SELECT * FROM project_members
        WHERE project_id = ? AND user_id = ?
    `;

    db.query(checkMember, [project_id, assigned_to], (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (result.length === 0) {
            return res.status(403).json({
                message: "User not part of this project"
            });
        }

        // STEP 2: insert task
        const insertQuery = `
            INSERT INTO tasks
            (title, description, status, priority, due_date, project_id, assigned_to, created_by)
            VALUES (?,?,?,?,?,?,?,?)
        `;

        db.query(
            insertQuery,
            [title, description, status, priority, due_date, project_id, assigned_to, created_by],
            (err2) => {
                if (err2) {
                    return res.status(500).json({ message: "Task creation failed" });
                }

                return res.json({ message: "Task created successfully" });
            }
        );
    });
};

// GET TASKS (ADMIN + MEMBER)
const getTasks = (req, res) => {
    if (req.user.role === "Admin") {
        const q = `
    SELECT
        t.*,
        u.name AS assigned_user
    FROM tasks t
    LEFT JOIN users u
    ON t.assigned_to = u.id
`;

        db.query(q, (err, result) => {
            if (err) return res.status(500).json({ message: "Failed" });
            return res.json(result);
        });

    } else {
        const q = `
            SELECT * FROM tasks
            WHERE assigned_to = ?
        `;

        db.query(q, [req.user.id], (err, result) => {
            if (err) return res.status(500).json({ message: "Failed" });
            return res.json(result);
        });
    }
};

// UPDATE TASK STATUS (ADMIN OR OWNER ONLY)
const updateTaskStatus = (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;

    const checkQuery = "SELECT * FROM tasks WHERE id = ?";

    db.query(checkQuery, [taskId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        const task = result[0];

        if (req.user.role !== "Admin" && task.assigned_to !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const updateQuery = "UPDATE tasks SET status = ? WHERE id = ?";

        db.query(updateQuery, [status, taskId], (err2) => {
            if (err2) {
                return res.status(500).json({ message: "Update failed" });
            }

            return res.json({ message: "Task updated" });
        });
    });
};

module.exports = { createTask, getTasks, updateTaskStatus };