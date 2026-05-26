const joi = require("joi");

const createTaskSchema = joi.object({
  title: joi.string().required().min(3).max(100).messages({
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title must be at most 100 characters long",
    "any.required": "Title is required",
  }),
  description: joi.string().required().min(5).max(1000).messages({
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description must be at most 1000 characters long",
    "any.required": "Description is required",
  }),
  status: joi.string().valid("pending", "in progress", "completed").messages({
    "any.only":
      "Status must be one of the following: pending, in progress, completed",
  }),
  priority: joi.string().valid("low", "medium", "high").messages({
    "any.only": "Priority must be one of the following: low, medium, high",
  }),
  dueDate: joi.date().required().messages({
    "date.base": "Due date must be a valid date",
    "any.required": "Due date is required",
  }),
});

module.exports = {
  createTaskSchema,
};
