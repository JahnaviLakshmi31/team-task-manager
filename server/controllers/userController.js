// controllers/userController.js

const db = require("../db/db");

const getUsers = (req, res) => {

    if (req.user.role !== "Admin") {
        return res.status(403).json({
            message: "Only Admin can view users"
        });
    }

    const query = `
        SELECT id, name, email
        FROM users
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to fetch users"
            });
        }

        return res.json(result);
    });
};

module.exports = { getUsers };