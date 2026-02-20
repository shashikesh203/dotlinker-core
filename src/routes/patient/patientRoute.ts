import express from "express";
import patientController from "../../controller/patient/patientController";
import authorization from "../../middleware/authValidator";
import { isPatient } from "../../middleware/roleValidator";

const patientRoute = express.Router();

patientRoute.get(
  "/get-doctors",
  authorization,
  isPatient,
  patientController.getDoctorDetails,
);
patientRoute.post(
  "/create-appointment",
  authorization,
  isPatient,
  patientController.createAppointment,
);
patientRoute.get(
  "/get-patient-appointments",
  authorization,
  patientController.getMyAppointments,
);
patientRoute.post(
  "/cancel-appointment/:id",
  authorization,
  isPatient,
  patientController.cancelAppointment,
);

export default patientRoute;
