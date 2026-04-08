const express = require("express");
const { register, login } = require("../controllers/authController");
const validate = require("../middleware/validateMiddleware");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const router = express.Router();

const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: "fail",
    message: "Too many requests. Try again later.",
  },
});

router.post("/register", registerValidator,authLimiter,  validate, register);
router.post("/login", loginValidator, authLimiter, validate, login);

module.exports = router;