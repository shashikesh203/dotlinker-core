import express from "express";
import authController from "../../controller/auth/authController";
import upload from "../../middleware/uploadImage";
import { validateRequest } from "../../middleware/requestvalidator";
import { loginValidationSchema } from "../../validator/loginSchema";
import { doctorSignUpValidationSchema } from "../../validator/doctorSignUpSchema";
import { patientSignUpValidationSchema } from "../../validator/patientSignUpSchema";

const authRoute = express.Router();

// Doctor Routes
authRoute.post("/doctor-signup", upload.single("doctor_profile"), validateRequest({schema: doctorSignUpValidationSchema}), authController.doctorSignUp);
authRoute.post("/doctor-signin", validateRequest({schema: loginValidationSchema}), authController.doctorSignIn);

// Patient Routes
authRoute.post("/patient-signup",upload.single("patient_profile"), validateRequest({schema: patientSignUpValidationSchema}), authController.patientSignUp);
authRoute.post("/patient-signin", validateRequest({schema: loginValidationSchema}), authController.patientSignIn);
export default authRoute;
