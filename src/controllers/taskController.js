const taskService = require("../services/taskService");

const taskController = {
  async createTask(req, res, next) {
    const { title, description, dueDate, status, priority } = req.body;

    const task = await taskService.createTask(
      title,
      description,
      dueDate,
      req.user._id,
      status,
      priority,
    );
    res.status(201).json(task);
  },
  async getTasks(req, res, next) {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  },
  async getTaskById(req, res, next) {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  },
  async updateTask(req, res, next) {
    const updatedTask = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user._id,
    );
    res.json(updatedTask);
  },
  async deleteTask(req, res, next) {
    const deletedTask = await taskService.deleteTask(req.params.id);
    res.status(204).json(deletedTask);
  },
};

module.exports = taskController;
