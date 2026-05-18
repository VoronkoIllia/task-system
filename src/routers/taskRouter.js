const express = require("express");

const taskController = require("../controllers/taskController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const catchAsync = require("../middlewares/error-handling/catchAsync");

const ROLES = require("../utils/roles");

const router = express.Router();

router.get("/", catchAsync(taskController.getTasks));
router.get("/:id", catchAsync(taskController.getTaskById));
router.post(
  "/",
  protect,
  restrictTo(ROLES.USER, ROLES.ADMIN),
  catchAsync(taskController.createTask),
);
router.put(
  "/:id",
  protect,
  restrictTo(ROLES.USER, ROLES.ADMIN),
  catchAsync(taskController.updateTask),
);
router.delete(
  "/:id",
  protect,
  restrictTo(ROLES.ADMIN),
  catchAsync(taskController.deleteTask),
);

module.exports = router;
