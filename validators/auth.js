const yup = require("yup");

// Define a validation schema for user fields
const registerValidatorSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required.") // Field is mandatory
    .min(2, "Name must be at least 2 characters long.") // Minimum length
    .max(50, "Name cannot exceed 50 characters."), // Maximum length

  userName: yup
    .string()
    .required("Username is required.") // Field is mandatory
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores (_)."
    ) // Regex to enforce valid characters
    .min(3, "Username must be at least 3 characters long.") // Minimum length
    .max(30, "Username cannot exceed 30 characters."), // Maximum length

  phone: yup
    .string()
    .required("Phone number is required.")
    .matches(/^09\d{9}$/, "Phone number must be in the format: 09xxxxxxxxx.")
    .length(11, "Phone number must be exactly 11 digits long."),

  email: yup
    .string()
    .required("Email is required.") // Field is mandatory
    .email("Invalid email format."), // Must follow valid email format

  password: yup
    .string()
    .required("Password is required.") // Field is mandatory
    .min(8, "Password must be at least 8 characters long.") // Minimum length
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ), // Regex to enforce strong password rules
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "confirmPassword must be equal to the password value."
    )
    .required(),
});

const loginValidatorSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, " email  must be at least 3 characters long.")
    .max(50, " email should not exceed 50 characters")
    .email()
    .required(" email is required"),
});

module.exports = registerValidatorSchema;
