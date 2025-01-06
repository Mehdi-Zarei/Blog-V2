const yup = require("yup");

const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required.") // Field is mandatory
    .email("Invalid email format."),
});
module.exports = forgetPasswordSchema;
