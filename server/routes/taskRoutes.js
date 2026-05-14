const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const{ createTask,getTasks,updateTaskStatus} = require("../controllers/taskController");

router.post("/create",authMiddleware,createTask);
router.get("/all",authMiddleware,getTasks);
router.put("/update/:id",authMiddleware,updateTaskStatus);

module.exports = router;