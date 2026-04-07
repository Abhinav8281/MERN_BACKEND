const Task = require("../models/Task");
const AppError = require("../utils/AppError");

// CREATE TASK
exports.createTask = async (req, res, next) => {
  const { title, description, status } = req.body;

  // Basic validation
  if (!title) {
    return next(new AppError("Title is required", 400));
  }

  const task = await Task.create({
    title,
    description,
    status,
    user: req.user, // from authMiddleware
  });

  res.status(201).json({
    status: "success",
    data: task,
  });
};
// GET /api/tasks
exports.getTasks = async (req, res, next) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const query = {};

  // 🔍 Filter by status
  if (status) {
    query.status = status;
  }

  // 🔍 Search (title)
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  // 👤 Only logged-in user's tasks
  query.user = req.user;

  const skip = (page - 1) * limit;

  const tasks = await Task.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(query);

  res.json({
    status: "success",
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    data: tasks,
  });
};