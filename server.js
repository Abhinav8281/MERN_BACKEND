const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const AppError = require("./utils/AppError");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

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



app.listen(5000, () => console.log("Server running"));