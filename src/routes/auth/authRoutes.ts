import express from "express";
import authController from "../../controller/auth/authController";
import upload from "../../middleware/uploadImage";

const doctorRoute = express.Router();

// Doctor Routes
doctorRoute.post("/doctor-signup", upload.single("doctor_profile"), authController.doctorSignUp);
doctorRoute.post("/doctor-signin", authController.doctorSignIn);

// Patient Routes
doctorRoute.post("/patient-signup",upload.single("patient_profile"), authController.patientSignUp);
doctorRoute.post("/patient-signin", authController.patientSignIn);
export default doctorRoute;
