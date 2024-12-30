const yup = require("yup");

const loginValidatorSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required.") // Field is mandatory
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores (_)."
    ) // Regex to enforce valid characters
    .min(3, "Username must be at least 3 characters long.") // Minimum length
    .max(30, "Username cannot exceed 30 characters."), // Maximum length
  password: yup
    .string()
    .required("Password is required.") // Field is mandatory
    .min(8, "Password must be at least 8 characters long.") // Minimum length
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ), // Regex to enforce strong password rules

  captcha: yup.string().max(4).required(),
});

module.exports = loginValidatorSchema;
