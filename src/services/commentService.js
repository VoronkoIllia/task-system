const Comment = require("../models/Comment");
const ApiError = require("../errors/ApiError");
const ROLES = require("../utils/roles");

const commentService = {
  async createComment(content, authorId, taskId) {
    if (!content || !authorId || !taskId) {
      throw ApiError.badRequest("Content, author ID, and task ID are required");
    }

    const comment = new Comment({
      content,
      author: authorId,
      task: taskId,
    });

    await comment.save();
    return comment;
  },

  async getCommentsByTaskId(taskId) {
    return Comment.find({ task: taskId }).populate("author", "name");
  },

  async deleteComment(commentId, user) {
    const comment = await Comment.findById(commentId).populate(
      "author",
      "name",
    );
    if (!comment) {
      throw ApiError.notFound("Comment not found");
    }

    if (
      comment.author._id.toString() !== user._id.toString() &&
      user.role !== ROLES.ADMIN
    ) {
      throw ApiError.forbidden("You are not the owner of this comment");
    }
    await comment.deleteOne();
    return comment;
  },
};

module.exports = commentService;
