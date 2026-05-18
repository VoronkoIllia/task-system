const express = require("express");

const taskController = require("../controllers/taskController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const ROLES = require("../utils/roles");

const router = express.Router();

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post(
  "/",
  protect,
  restrictTo(ROLES.USER, ROLES.ADMIN),
  taskController.createTask,
);
router.put(
  "/:id",
  protect,
  restrictTo(ROLES.USER, ROLES.ADMIN),
  taskController.updateTask,
);
router.delete(
  "/:id",
  protect,
  restrictTo(ROLES.ADMIN),
  taskController.deleteTask,
);

module.exports = router;
