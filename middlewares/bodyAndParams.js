module.exports = (paramValidator, bodyValidator) => {
  return async (req, res, next) => {
    try {
      await paramValidator.validate(req.params, { abortEarly: false });

      await bodyValidator.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }
    next();
  };
};
