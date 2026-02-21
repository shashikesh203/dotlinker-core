import express from "express";
import doctorController from "../../controller/doctor/doctorController";
import authorization from "../../middleware/authValidator";
import { isDoctor } from "../../middleware/roleValidator";
import { validateRequest } from "../../middleware/requestvalidator";
import { PayloadType } from "../../utils/enum/common.enum";
import { getAppointmentSchema } from "../../validator/getAppointmentSchema";
import { statusSchema } from "../../validator/statusSchema";


const doctorRoute = express.Router();
doctorRoute.get(
  "/get-doctor-appointments",
  authorization,
  isDoctor,
  validateRequest({schema: getAppointmentSchema, type: PayloadType.QUERY}),
  doctorController.getMyAppointments,
);

doctorRoute.post(
  "/update-appointment/:id",
  authorization,
  isDoctor,
  validateRequest({schema: statusSchema}),
  doctorController.updateAppointmentStatus,
);

export default doctorRoute;
