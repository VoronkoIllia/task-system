const commentService = require("../services/commentService");
const ApiError = require("../errors/ApiError");

const commentController = {
  async createComment(req, res, next) {
    const { content } = req.body;
    const authorId = req.user._id;
    const { taskId } = req.params;

    const comment = await commentService.createComment(
      content,
      authorId,
      taskId,
    );

    res.status(201).json({
      success: true,
      comment,
      message: "Comment created successfully",
    });
  },

  async getCommentsByTaskId(req, res, next) {
    const { taskId } = req.params;
    const comments = await commentService.getCommentsByTaskId(taskId);
    res.json({
      success: true,
      comments,
    });
  },

  async deleteComment(req, res, next) {
    const { commentId } = req.params;
    const comment = await commentService.deleteComment(commentId, req.user);
    res.json({
      success: true,
      comment,
      message: "Comment deleted successfully",
    });
  },
};

module.exports = commentController;
