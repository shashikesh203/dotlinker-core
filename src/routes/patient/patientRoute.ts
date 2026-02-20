import express from "express";
import patientController from "../../controller/patient/patientController";
import authorization from "../../middleware/authValidator";

const patientRoute = express.Router();

patientRoute.get(
  "/get-doctors",
  authorization,
  patientController.getDoctorDetails,
);
patientRoute.post(
  "/create-appointment",
  authorization,
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
  patientController.cancelAppointment,
);

export default patientRoute;
