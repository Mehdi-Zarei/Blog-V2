const fs = require("fs");
const articlesModel = require("../models/Articles");
const TagsModel = require("../models/Tags");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
  try {
    let { title, description, content, tags } = req.body;

    const author = await req.user;

    tags = Array.isArray(tags) ? tags : [tags];

    const slug = slugify(title, { lower: true });

    // tags = tags.map((tag) =>
    //   TagsModel.findOrCreate({ where: { title: tag.trim() } })
    // );
    // tags = await Promise.all(tags);

    const coverPath = `public/images/covers/${req.file?.filename}`;

    const newArticles = await articlesModel.create({
      title,
      description,
      content,
      slug,
      publish: false,
      author_id: author.id,
      cover: req.file ? coverPath : null,
    });

    return res
      .status(201)
      .json({ message: "New Article Created Successfully.", newArticles });
  } catch (error) {
    next(error);
  }
};
