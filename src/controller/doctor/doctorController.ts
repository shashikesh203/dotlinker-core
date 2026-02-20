import { RequestHandler } from "express";
import config from "../../config";
import AppointmentModel from "../../model/appointmentModel";
import { Types } from "mongoose";
import { HttpStatusCode } from "axios";
import { CustomError } from "../../utils/helper/customError";
import { AppointmentStatus } from "../../utils/enum/common.enum";

class DoctorController {
  getMyAppointments: RequestHandler = async (req: any, res, next) => {
    try {
      const doctorId = req.users?.id;
      const { status, page = 1 } = req.query;
      const limit = parseInt(config.commonConfig.pageLimit);
      const skip = (parseInt(page as string) - 1) * limit;

      const appointmentsDetails = await AppointmentModel.aggregate([
        {
          $match: {
            doctorId: new Types.ObjectId(doctorId),
            ...(status ? { status } : {}),
          },
        },
        {
          $lookup: {
            from: "patients",
            localField: "patientId",
            foreignField: "_id",
            as: "patientDetails",
          },
        },
        { $unwind: "$patientDetails" },
        {
          $project: {
            doctorId: 1,
            patientId: 1,
            createdAt: 1,
            status: 1,
            patientDetails: {
              name: 1,
              age: 1,
            },
          },
        },
        { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
      ]);

      const totalAppointments = await AppointmentModel.countDocuments({
        doctorId: new Types.ObjectId(doctorId),
        ...(status ? { status } : {}),
      });
      const totalPages = Math.ceil(totalAppointments / limit);

      return res.status(HttpStatusCode.Ok).json({
        success: true,
        message: "Patient appointments fetched successfully",
        data: appointmentsDetails,
        pagination: {
          totalAppointments,
          currentPage: parseInt(page as string),
          totalPages,
          limit,
        },
      });
    } catch (error) {
      next(
        new CustomError(
          "Unable to fetch appointments",
          HttpStatusCode.InternalServerError,
        ),
      );
    }
  };

  updateAppointmentStatus: RequestHandler = async (req: any, res, next) => {
    try {
      const doctorId = req.users?.id;
      const appointmentId = req.params.id;
      const { status } = req.body;  
      const appointmentDetail = await AppointmentModel.findById(appointmentId);

      if(appointmentDetail.status === AppointmentStatus.CANCELLED){
        return next(
          new CustomError(
            "Cancelled appointments cannot be updated",
            HttpStatusCode.BadRequest,
          ),
        );
      }
      if([AppointmentStatus.APPROVED, AppointmentStatus.REJECTED].includes(status) && appointmentDetail?.status !== AppointmentStatus.PENDING){
        return next(
          new CustomError(
            "Only pending appointments can be updated",
            HttpStatusCode.BadRequest,
          ),
        );

      }

      if([AppointmentStatus.APPROVED, AppointmentStatus.REJECTED].includes(status) && appointmentDetail?.status === AppointmentStatus.COMPLETED){
        return next(
          new CustomError(
            "Completed appointments cannot be updated",
            HttpStatusCode.BadRequest,
          ),
        );

      }

      const appointment = await AppointmentModel.findByIdAndUpdate(
        {
          _id: appointmentId,
          doctorId: new Types.ObjectId(doctorId),
        },
        { status },
        { new: true },
      );

      if (!appointment) {
        return next(
          new CustomError(
            "You are not authorized to update this appointment",
            HttpStatusCode.MethodNotAllowed,
          ),
        );
      }

      return res.status(HttpStatusCode.Ok).json({
        success: true,
        message: "Appointment status updated successfully",
        data: appointment,
      });
    } catch (error) {
      next(
        new CustomError(
          "Unable to update appointment status",
          HttpStatusCode.InternalServerError,
        ),
      );
    }
  };
}

export default new DoctorController();
