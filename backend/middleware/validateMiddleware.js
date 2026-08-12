function validate(schema) {
  return (req, res, next) => {
    const errors = [];
    Object.entries(schema).forEach(([field, rule]) => {
      const value = req.body[field];
      if (rule.required && (value === undefined || value === null || value === "")) {
        errors.push(`${field} is required`);
      }
      if (rule.type && value !== undefined && value !== null && value !== "" && typeof value !== rule.type) {
        if (!(rule.type === "number" && !Number.isNaN(Number(value)))) {
          errors.push(`${field} must be ${rule.type}`);
        }
      }
    });
    if (errors.length) return res.status(400).json({ success: false, message: "Validation failed", errors });
    next();
  };
}

module.exports = validate;
