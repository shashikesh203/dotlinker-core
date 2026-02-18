import { RequestHandler } from "express";
import DoctorModel from "../../model/docterModel";
import { HttpStatusCode } from "axios";
import { CustomError } from "../../utils/helper/customError";
import { UserRole } from "../../utils/enum/common.enum";
import generateJwtToken from "../../utils/helper/generateJwtToken";
import bcryptjs from "bcryptjs";
import config from "../../config";
import PatientModel from "../../model/patientModel";
import { ExtendedRequest } from "../../utils/interface/extendedRequest.Interface";
import { Query } from "mongoose";
import { spec } from "node:test/reporters";

class CommonController {
  getDoctorProfile: RequestHandler = async (
    req: ExtendedRequest,
    res,
    next,
  ) => {
    try {
      const doctorDetail = await DoctorModel.findById(req.users?.id).select("-password");
      if (!doctorDetail) {
       return next(new CustomError("Doctor profile not found", HttpStatusCode.NotFound));
      }
      return res.status(HttpStatusCode.Ok).json({
        message: "Doctor profile retrieved successfully",
        success: true,
        data: {
          ...doctorDetail.toObject(),
          doctor_profile: doctorDetail.doctor_profile
            ? `http://localhost:${config.commonConfig.port}/uploads/${doctorDetail.doctor_profile}`
            : null,
        },
      });
    } catch (error) {
        next(new CustomError("Unable to fetch doctor profile", HttpStatusCode.InternalServerError));
    }
  };
  getPatientProfile: RequestHandler = async (
  req: ExtendedRequest,
  res,
  next
) => {
  try {
    const patientDetail = await PatientModel.findById(req.users?.id).select(
      "-password"
    );

    if (!patientDetail) {
      return next(
        new CustomError(
          "Patient profile not found",
          HttpStatusCode.NotFound
        )
      );
    }

    return res.status(HttpStatusCode.Ok).json({
      message: "Patient profile retrieved successfully",
      success: true,
      data: {
        ...patientDetail.toObject(),
        patient_profile: patientDetail.patient_profile
          ? `http://localhost:${config.commonConfig.port}/uploads/${patientDetail.patient_profile}`
          : null,
      },
    });
  } catch (error) {
    next(
      new CustomError(
        "Unable to fetch patient profile",
        HttpStatusCode.InternalServerError
      )
    );
  }
  };

}

export default new CommonController();
