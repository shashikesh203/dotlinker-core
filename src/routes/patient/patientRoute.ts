import express from "express";
import patientController from "../../controller/patient/patientController";

const patientRoute = express.Router();

patientRoute.get("/get-doctors", patientController.getDoctorDetails);

export default patientRoute;
