const Task = require("../models/Task");
const ApiError = require("../errors/ApiError");

const taskController = {
  async createTask(req, res, next) {
    const task = new Task({ ...req.body, createdBy: req.user.id });
    await task.save();
    res.status(201).json(task);
  },
  async getTasks(req, res, next) {
    const tasks = await Task.find();
    res.json(tasks);
  },
  async getTaskById(req, res, next) {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(ApiError.notFound("Task not found"));
    }
    res.json(task);
  },
  async updateTask(req, res, next) {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return next(ApiError.notFound("Task not found"));
    }
    res.json(updatedTask);
  },
  async deleteTask(req, res, next) {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return next(ApiError.notFound("Task not found"));
    }
    res.status(204).send();
  },
};

module.exports = taskController;
