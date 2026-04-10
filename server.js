const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const AppError = require("./utils/AppError");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


dotenv.config();
connectDB();



const rateLimit = require("express-rate-limit");

// ✅ Limit login attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests
  message: {
    status: "fail",
    message: "Too many login attempts. Try again later.",
  },
});

const app = express();
app.use(express.json());
app.use(helmet());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/tasks", require("./routes/taskRoutes"));

// ❌ Invalid Route Handler
app.use( (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// create write stream for logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "combined.log"),
  { flags: "a" }
);

// use morgan
app.use(morgan("combined", { stream: accessLogStream }));

// ✅ Error Middleware (MUST BE LAST)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});