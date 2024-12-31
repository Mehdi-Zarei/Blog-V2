const errorHandler = (err, req, res, next) => {
  console.log(err.errors);
  return res.json({
    statusCode: err.status || 500,
    msg: err.errors[0].message || "Server Error !!",
  });
};

module.exports = { errorHandler };
