import express from "express";
import doctorController from "../../controller/doctor/doctorController";
import authorization from "../../middleware/authValidator";


const doctorRoute = express.Router();
doctorRoute.get(
  "/get-doctor-appointments",
  authorization,
  doctorController.getMyAppointments,
);

doctorRoute.post(
  "/update-appointment/:id",
  authorization,
  doctorController.updateAppointmentStatus,
);

export default doctorRoute;
