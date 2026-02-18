import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  specialization: string;
  startTime: string;
  endTime: string;
  description: string;
  doctor_profile: string;
}

const DoctorSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    isDeleted: { type: Boolean, default: false },
    startTime: { type: String },
    endTime: { type: String },
    specialization: { type: String },
    description: { type: String },
    doctor_profile: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const DoctorModel = mongoose.model<IDoctor>("Doctor", DoctorSchema);
export default DoctorModel;