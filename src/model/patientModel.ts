import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  email: string;
  age?: number;
  password: string;
  patient_profile?: string;
  isDeleted: boolean;
}

const PatientSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
    },
    patient_profile: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PatientModel = mongoose.model<IPatient>("Patient", PatientSchema);

export default PatientModel;
