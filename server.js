const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const AppError = require("./utils/AppError");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

// ❌ Invalid Route Handler
app.use( (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// ✅ Error Middleware (MUST BE LAST)
app.use(errorMiddleware);

app.listen(5000, () => console.log("Server running"));