const yup = require("yup");

const articleSchema = yup.object().shape({
  title: yup
    .string()
    .max(255, "Title cannot be longer than 255 characters")
    .required("Title is required"),

  description: yup
    .string()
    .max(255, "Description cannot be longer than 255 characters")
    .required("Description is required"),

  content: yup.string().required("Description is required"),

  // tags: yup
  //   .array()
  //   .of(
  //     yup
  //       .string()
  //       .matches(
  //         /^[\u0600-\u06FFa-zA-Z-_]+$/,
  //         "Tag must only contain Persian/English letters, dashes, or underscores, and cannot contain numbers"
  //       )
  //   )
  //   .required("Tags are required")
  //   .min(1, "At least one tag is required")
  //   .test("no-numbers", "Tags cannot contain numeric values", (tags) =>
  //     tags.every((tag) => !/^\d+$/.test(tag))
  //   ),

  tags: yup.mixed().test(
    "is-string-or-array",
    "Tags must be a string or an array of strings", // ["frontend", 12]
    (value) => {
      return (
        typeof value === "string" ||
        (Array.isArray(value) &&
          value.every((item) => typeof item === "string"))
      );
    }
  ),
});

module.exports = articleSchema;
