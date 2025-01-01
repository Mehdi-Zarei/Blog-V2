const fs = require("fs");
const articlesModel = require("../models/Articles");
// const TagsModel = require("../models/Tags");
const UsersModel = require("../models/Users");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
  try {
    let { title, description, content, tags } = req.body;

    const author = await req.user;

    console.log(tags);

    // tags = Array.isArray(tags) ? tags : [tags];

    let slug = slugify(title, { lower: true });

    const isSlugExist = !!(await articlesModel.findOne({ where: { slug } }));

    //* Generate Unique Slug if the slug already exist

    if (isSlugExist) {
      slug = slug + "-" + Date.now().toString().slice(-4);
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
      tags,
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

exports.findBySlug = async (req, res, next) => {
  try {
    const slug = req.params;

    const article = await articlesModel.findOne({
      where: slug,
      include: [
        {
          model: UsersModel,
          attributes: ["name", "userName"],
          as: "author",
        },
        {
          model: TagsModel,
          attributes: ["title"],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ["author_id", "deletedAt"],
      },
    });

    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
