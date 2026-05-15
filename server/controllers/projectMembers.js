// controllers/projectMembers.js

const db = require("../db/db");


// ================= ADD MEMBER =================
const addMemberToProject = (req, res) => {

    if (req.user.role !== "Admin") {
        return res.status(403).json({
            message: "Only Admin can add members"
        });
    }

    const { project_id, user_id } = req.body;

    if (!project_id || !user_id) {
        return res.status(400).json({
            message: "Project and user required"
        });
    }

    // CHECK ALREADY EXISTS
    const checkQuery = `
        SELECT *
        FROM project_members
        WHERE project_id = ?
        AND user_id = ?
    `;

    db.query(checkQuery, [project_id, user_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Server error"
            });
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "User already added to project"
            });
        }

        // INSERT MEMBER
        const insertQuery = `
            INSERT INTO project_members(project_id, user_id)
            VALUES(?, ?)
        `;

        db.query(insertQuery, [project_id, user_id], (err2) => {

            if (err2) {
                return res.status(500).json({
                    message: "Failed to add member"
                });
            }

            return res.json({
                message: "Member added successfully"
            });
        });
    });
};


// ================= GET MEMBERS =================
const getProjectMembers = (req, res) => {

    const project_id = req.params.project_id;

    const query = `
        SELECT u.id, u.name, u.email
        FROM users u
        JOIN project_members pm
        ON u.id = pm.user_id
        WHERE pm.project_id = ?
    `;

    db.query(query, [project_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to fetch members"
            });
        }

        return res.json(result);
    });
};


// ================= REMOVE MEMBER =================
const removeMemberFromProject = (req, res) => {

    if (req.user.role !== "Admin") {
        return res.status(403).json({
            message: "Only Admin can remove members"
        });
    }

    const { project_id, user_id } = req.body;

    // CHECK ACTIVE TASKS
    const checkTasks = `
        SELECT *
        FROM tasks
        WHERE project_id = ?
        AND assigned_to = ?
        AND status != 'Done'
    `;

    db.query(checkTasks, [project_id, user_id], (err, tasks) => {

        if (err) {
            return res.status(500).json({
                message: "Server error"
            });
        }

        if (tasks.length > 0) {
            return res.status(400).json({
                message: "User has active tasks"
            });
        }

        // REMOVE MEMBER
        const removeQuery = `
            DELETE FROM project_members
            WHERE project_id = ?
            AND user_id = ?
        `;

        db.query(removeQuery, [project_id, user_id], (err2) => {

            if (err2) {
                return res.status(500).json({
                    message: "Failed to remove member"
                });
            }

            return res.json({
                message: "Member removed successfully"
            });
        });
    });
};


module.exports = {
    addMemberToProject,
    getProjectMembers,
    removeMemberFromProject
};