module.exports = (validator) => {
  return async (req, res, next) => {
    try {
      await validator.validate(req.body, { abortEarly: false }); //Todo check abort early
    } catch (err) {
      return res.status(400).json({ message: err.errors });
    }
    next();
  };
};
