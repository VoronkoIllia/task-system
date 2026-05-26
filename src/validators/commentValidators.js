const joi = require("joi");

const createCommentSchema = joi.object({
  content: joi.string().required().min(2).max(500).messages({
    "string.min": "Comment content must be at least 2 characters long",
    "string.max": "Comment content must be at most 500 characters long",
    "any.required": "Comment content is required",
  }),
});

module.exports = {
  createCommentSchema,
};
