import express from "express";
import commonController from "../../controller/common/commonController";
import authorization from "../../middleware/authValidator";
import { isDoctor, isPatient } from "../../middleware/roleValidator";


const commonRoute = express.Router();

commonRoute.get("/get-doctor-details",authorization, isDoctor, commonController.getDoctorProfile);  
commonRoute.get("/get-patient-details",authorization, isPatient, commonController.getPatientProfile);  
export default commonRoute;


