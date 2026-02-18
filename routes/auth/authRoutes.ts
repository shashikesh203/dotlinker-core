import express from "express";
import authController from "../../src/controller/auth/authController";
import upload from "../../src/middleware/uploadImage";

const doctorRoute = express.Router();

doctorRoute.post("/doctor-signup", upload.single("doctor_profile"), authController.doctorSignUp);
doctorRoute.post("/doctor-signin", authController.doctorSignIn);

export default doctorRoute;
