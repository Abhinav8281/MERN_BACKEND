const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Tasks Data",
    userId: req.user,
  });
});

module.exports = router;