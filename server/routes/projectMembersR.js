const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addMemberToProject, getProjectMembers ,removeMemberFromProject} = require('../controllers/projectMembers');
router.post("/add-member", authMiddleware, addMemberToProject);
router.get("/members/:project_id", authMiddleware, getProjectMembers);
router.delete(
    "/remove-member",
    authMiddleware,
    removeMemberFromProject
);
module.exports = router;