const express = require('express');
const app = express();
const cors = require('cors');
require('./db/db');

const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require("./routes/projectRoute");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const projectMembersRoutes = require("./routes/projectMembersR")
const userRoutes = require("./routes/userRoutes");

app.use(cors({}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);
app.use('/projectMembers',projectMembersRoutes);
app.use("/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Server running')
})

app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Started on ${PORT}");
});
