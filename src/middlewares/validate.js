const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        const field = detail.path.join(".");
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(detail.message);
      });
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
};

module.exports = validate;
