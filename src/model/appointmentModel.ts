import mongoose, { Schema, Document } from "mongoose";
import { AppointmentStatus } from "../utils/enum/common.enum";

export interface IAppointment extends Document {
  doctorId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  timeSlot: string;
  status: "PENDING" | "CANCELLED" | "COMPLETED";
}

const AppointmentSchema = new Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const AppointmentModel = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);

export default AppointmentModel;
