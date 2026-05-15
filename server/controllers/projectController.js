const db = require("../db/db");

// ================= CREATE PROJECT =================
const createProject = (req, res) => {

    if (req.user.role !== "Admin") {
        return res.status(403).json({
            message: "Only Admin can create projects"
        });
    }

    const { project_name } = req.body;

    if (!project_name) {
        return res.status(400).json({ message: "Project name required" });
    }

    const created_by = req.user.id;

    const query =
        "INSERT INTO projects (project_name, created_by) VALUES (?, ?)";

    db.query(query, [project_name, created_by], (err) => {
        if (err) {
            return res.status(500).json({
                message: "Project creation failed"
            });
        }

        return res.status(201).json({
            message: "Project created successfully"
        });
    });
};


// ================= GET PROJECTS =================
const getProjects = (req, res) => {

    const userId = req.user.id;
    const role = req.user.role;

    // ADMIN → all projects
    if (role === "Admin") {

        const query = "SELECT * FROM projects";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch projects" });
            }

            return res.json(result);
        });

    }

    // MEMBER → only projects they belong to
    else {

        const query = `
            SELECT p.*
            FROM projects p
            JOIN project_members pm ON p.id = pm.project_id
            WHERE pm.user_id = ?
        `;

        db.query(query, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch projects" });
            }

            return res.json(result);
        });
    }
};

module.exports = { createProject, getProjects };