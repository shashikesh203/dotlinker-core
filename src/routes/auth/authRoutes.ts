import express from "express";
import authController from "../../controller/auth/authController";
import upload from "../../middleware/uploadImage";

const authRoute = express.Router();

// Doctor Routes
authRoute.post("/doctor-signup", upload.single("doctor_profile"), authController.doctorSignUp);
authRoute.post("/doctor-signin", authController.doctorSignIn);

// Patient Routes
authRoute.post("/patient-signup",upload.single("patient_profile"), authController.patientSignUp);
authRoute.post("/patient-signin", authController.patientSignIn);
export default authRoute;
