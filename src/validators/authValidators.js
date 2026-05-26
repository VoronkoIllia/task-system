const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().required().min(3).max(30).messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
    "any.required": "Name is required",
  }),
  email: joi.string().required().email().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: joi.string().required().min(6).messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

const loginSchema = joi.object({
  email: joi.string().required().email().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: joi.string().required().min(6).messages({
    "any.required": "Password is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
