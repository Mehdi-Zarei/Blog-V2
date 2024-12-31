const fs = require("fs");
const articlesModel = require("../models/Articles");
const TagsModel = require("../models/Tags");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res, next) => {
  try {
    let { title, description, content, tags } = req.body;

    const author = await req.user;

    tags = Array.isArray(tags) ? tags : [tags];

    let slug = slugify(title, { lower: true });

    const isSlugExist = !!(await articlesModel.findOne({ where: { slug } }));

    //* Generate Unique Slug if the slug already exist

    if (isSlugExist) {
      slug = slug + "-" + uuidv4().replace(/[^\d]/g, "").slice(1, 5);
    }

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

    return res.status(201).json({
      message: "New Article Created Successfully.",
      newArticles,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
