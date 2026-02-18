import express from "express";
import commonController from "../../controller/common/commonController";
import authorization from "../../middleware/authValidator";


const commonRoute = express.Router();

commonRoute.get("/get-doctor-details",authorization, commonController.getDoctorProfile);  
commonRoute.get("/get-patient-details",authorization, commonController.getPatientProfile);  
export default commonRoute;


