import express from "express";
import doctorController from "../../controller/doctor/doctorController";
import authorization from "../../middleware/authValidator";
import { isDoctor } from "../../middleware/roleValidator";


const doctorRoute = express.Router();
doctorRoute.get(
  "/get-doctor-appointments",
  authorization,
  isDoctor,
  doctorController.getMyAppointments,
);

doctorRoute.post(
  "/update-appointment/:id",
  authorization,
  isDoctor,
  doctorController.updateAppointmentStatus,
);

export default doctorRoute;
