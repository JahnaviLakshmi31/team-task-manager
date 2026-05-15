
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getUsers
} = require("../controllers/userController");

router.get(
    "/all",
    authMiddleware,
    getUsers
);

module.exports = router;