const db = require('../db/db');
const createTask = async (req, res) => {
    const { title, description, status, priority, due_date, project_id, assigned_to } = req.body;
    const created_by = req.user.id;
    const insertQuery = `INSERT INTO tasks(title, description, status, priority, due_date, project_id, assigned_to, created_by)
        VALUES(?,?,?,?,?,?,?,?)`;
    db.query(insertQuery, [title, description, status, priority, due_date, project_id, assigned_to, created_by], (err, result) => {
        if (err) {
            return res.json({
                message: "Task Creation failed"
            })
        }
        return res.json({
            message: "Task Created Successfully"
        });
    });
};
const getTasks = async (req, res) => {
    const getQuery = "SELECT * from tasks";
    db.query(getQuery, (err, result) => {
        if (err) {
            return res.json({
                message: "Failed to fetch tasks"
            })
        };
        return res.json(result);
    });
};
const updateTaskStatus = (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;
    const updateQuery = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(updateQuery, [status, taskId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Task update failed"
            });
        }
        return res.status(200).json({
            message: "Task updated successfully"
        });
    });
};
module.exports = { createTask, getTasks, updateTaskStatus };