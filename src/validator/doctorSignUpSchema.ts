import * as yup from "yup";
export const doctorSignUpValidationSchema = yup.object({
  name: yup
    .string()
    .required("Doctor name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

   password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .matches(/^\S*$/, "Password must not contain spaces"),
  specialization: yup
    .string()
    .required("Specialization is required"),

  startTime: yup
    .string()
    .required("Start time is required"),

  endTime: yup
    .string()
    .required("End time is required"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

});
