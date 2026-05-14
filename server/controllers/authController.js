const db = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const useerExists = "SELECT * FROM users WHERE email = ?";
    db.query(useerExists, [email], async (err, result) => {
        if (result.length > 0) {
            return res.json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = "INSERT INTO users(name,email,password) VALUES(?,?,?)";
        db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
            if (err) {
                return res.json({
                    message: "Registration failed"
                });
            }
            return res.json({
                message: "User resgistered Successfully"
            });
        }
        );
    });
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const checkuser = "SELECT * FROM users WHERE email = ?";
    db.query(checkuser, [email], async (err, result) => {
        if (result.length === 0) {
            return res.json({
                message: "User not found"
            });
        }
        const user = result[0];
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.json({
                message: "Invalid Password"
            });
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        return res.json({
            message: "Login Successful",
            token
        });
    });
};
module.exports = { registerUser, loginUser };