const db = require("../db/db");
const createProject = (req, res) => {
    const { project_name } = req.body;
    const created_by = req.user.id;
    const insertQuery = "INSERT INTO projects(project_name, created_by) VALUES(?,?)";
    db.query(insertQuery, [project_name, created_by], (err, result) => {
        if (err) {
            return res.json({
                message: "Project Creation failed"
            });
        }
        return res.json({
            message: "Projected Created Successfully"
        });
    }
    );
};
const getProjects = (req, res) => {
    const getQuery = "SELECT * from projects";
    db.query(getQuery, (err, result) => {
        if (err) {
            return res.json({
                message: "Failed to fetch projects"
            });
        }
        return res.json(result);
    })
};
module.exports = { createProject, getProjects };