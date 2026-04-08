const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getTasks, createTask } = require("../controllers/taskController");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Secure tasks data",
    user: req.user,
  });
});


module.exports = router;