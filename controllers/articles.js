exports.create = async (req, res, next) => {
  try {
    // const { title, description, content } = req.body;

    console.log("req body -->", req.body);

    return res
      .status(201)
      .json({ message: "New Article Created Successfully." });
  } catch (error) {
    next(error);
  }
};
