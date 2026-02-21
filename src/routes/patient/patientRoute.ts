import express from "express";
import patientController from "../../controller/patient/patientController";
import authorization from "../../middleware/authValidator";
import { isPatient } from "../../middleware/roleValidator";
import { validateRequest } from "../../middleware/requestvalidator";
import { getAppointmentSchema } from "../../validator/getAppointmentSchema";
import { PayloadType } from "../../utils/enum/common.enum";

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
  validateRequest({schema: getAppointmentSchema, type: PayloadType.QUERY}),
  patientController.getMyAppointments,
);
patientRoute.post(
  "/cancel-appointment/:id",
  authorization,
  isPatient,
  patientController.cancelAppointment,
);

export default patientRoute;
