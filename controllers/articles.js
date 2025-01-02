const fs = require("fs");
const articlesModel = require("../models/Articles");
// const TagsModel = require("../models/Tags");
const UsersModel = require("../models/Users");
const slugify = require("slugify");
const {
  calculatingRelativeTimeDifference,
} = require("../utils/CalculatingTimeDifference");

exports.create = async (req, res, next) => {
  try {
    let { title, description, content, tags } = req.body;

    const author = await req.user;

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
      ],
      attributes: {
        exclude: ["author_id", "deletedAt"],
      },
      raw: true,
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found !!" });
    } else {
      article.createdAt = calculatingRelativeTimeDifference(article.createdAt);
      article.updatedAt = calculatingRelativeTimeDifference(article.updatedAt);
    }

    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mainUser = await req.user;

    const article = await articlesModel.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found !!" });
    }

    if (article.author_id !== mainUser.id) {
      return res.status(403).json({ message: "Forbidden !!" });
    }

    const remove = await articlesModel.destroy({ where: { id } });

    return res.status(200).json({ message: "Article removed successfully." });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const articles = await articlesModel.findAll({
      include: [
        {
          model: UsersModel,
          attributes: ["name", "userName"],
          as: "author",
        },
      ],
      attributes: {
        exclude: ["author_id", "deletedAt"],
      },
      order: [["id", "DESC"]],
      raw: true,
    });

    articles.forEach((article) => {
      article.createdAt = calculatingRelativeTimeDifference(article.createdAt);
      article.updatedAt = calculatingRelativeTimeDifference(article.updatedAt);
    });

    return res.json(articles);
  } catch (error) {
    next(error);
  }
};
