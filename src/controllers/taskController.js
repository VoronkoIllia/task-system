const taskService = require("../services/taskService");

const taskController = {
  async createTask(req, res, next) {
    const { title, description, dueDate, status, priority, userId } = req.body;

    const task = await taskService.createTask(
      title,
      description,
      dueDate,
      userId,
      status,
      priority,
    );
    res.status(201).json({ success: true, data: task });
  },
  async getTasks(req, res, next) {
    const tasks = await taskService.getAllTasks();
    res.json({ success: true, data: tasks });
  },
  async getTaskById(req, res, next) {
    const task = await taskService.getTaskById(req.params.id);
    res.json({ success: true, data: task });
  },
  async updateTask(req, res, next) {
    const { title, description, dueDate, status, priority } = req.body;

    const updatedTask = await taskService.updateTask(
      req.params.id,
      { title, description, dueDate, status, priority },
      req.user._id,
    );
    res.json({ success: true, data: updatedTask });
  },
  async deleteTask(req, res, next) {
    const deletedTask = await taskService.deleteTask(req.params.id);
    res.status(204).json({ success: true, data: deletedTask });
  },
};

module.exports = taskController;
