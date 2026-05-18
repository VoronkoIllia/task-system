const Task = require("../models/Task");
const User = require("../models/User");
const ApiError = require("../errors/ApiError");

const taskService = {
  async createTask(
    title,
    description,
    dueDate,
    createdBy,
    status = "pending",
    priority = "medium",
  ) {
    if (!title || !description) {
      throw ApiError.badRequest("Title and description are required");
    }

    const user = await User.findById(createdBy);
    if (!user) {
      throw ApiError.notFound("User not found");
    }

    const task = new Task({
      title,
      description,
      dueDate,
      createdBy,
      status,
      priority,
    });

    await task.save();
    return task;
  },

  async getAllTasks() {
    const tasks = await Task.find();
    return tasks;
  },

  async getTaskById(id) {
    const task = await Task.findById(id);
    if (!task) {
      throw ApiError.notFound("Task not found");
    }
    return task;
  },

  async updateTask(id, updates, userId) {
    const task = await Task.findById(id);
    if (!task) {
      throw ApiError.notFound("Task not found");
    }

    if (task.createdBy.toString() !== userId) {
      throw new ApiError(403, "You don't have permission to update this task");
    }
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      throw ApiError.notFound("Task not found");
    }
    return updatedTask;
  },

  async deleteTask(id) {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      throw ApiError.notFound("Task not found");
    }
    return deletedTask;
  },
};

module.exports = taskService;
