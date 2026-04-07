const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getTasks, createTask } = require("../controllers/taskController");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);

module.exports = router;