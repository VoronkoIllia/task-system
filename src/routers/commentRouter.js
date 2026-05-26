const express = require("express");
const commentController = require("../controllers/commentController");
const protect = require("../middlewares/protect");
const catchAsync = require("../middlewares/error-handling/catchAsync");

const validate = require("../middlewares/validate");
const { createCommentSchema } = require("../validators/commentValidators");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  protect,
  validate(createCommentSchema),
  catchAsync(commentController.createComment),
);
router.get("/", catchAsync(commentController.getCommentsByTaskId));
router.delete(
  "/:commentId",
  protect,
  catchAsync(commentController.deleteComment),
);

module.exports = router;
