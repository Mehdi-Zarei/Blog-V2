const yup = require("yup");

const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required.") // Field is mandatory
    .email("Invalid email format."),
});

const resetPasswordParamsSchema = yup.object().shape({
  token: yup
    .string()
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      "Invalid token format"
    )
    .required("Reset Password Token Is Required."),
});
const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required.") // Mandatory field
    .min(8, "Password must be at least 8 characters long.") // Minimum length
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

module.exports = {
  forgetPasswordSchema,
  resetPasswordParamsSchema,
  resetPasswordSchema,
};
