import Task from "../models/taskModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const taskes = await Task.find({ user: req.user._id });
  res.json(taskes);
});

//@description     Fetch single Task
//@route           GET /api/task/:id
//@access          Public
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

//@description     Create single Task
//@route           GET /api/task/create
//@access          Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, estimatedTime, remainderTime, isCompleted } = req.body;
  console.log(req.body)
  console.log(req.user._id)
  if (!title || !estimatedTime || !remainderTime) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const task = new Task({ user: req.user._id, title, description, estimatedTime, remainderTime, isCompleted });

    const createdTask = await task.save();

    res.status(201).json(createdTask);
  }
});

//@description     Delete single Task
//@route           GET /api/tasks/:id
//@access          Private
const DeleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (task) {
    await task.remove();
    res.json({ message: "Task Removed" });
  } else {
    res.status(404);
    throw new Error("Task not Found");
  }
});

// @desc    Update a task
// @route   PUT /api/task/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, estimatedTime, isCompleted } = req.body;

  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (task) {
    task.title = title;
    task.description = description;
    task.estimatedTime = estimatedTime;
    task.isCompleted = isCompleted;


    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

export { getTaskById, getTasks, createTask, DeleteTask, updateTask };