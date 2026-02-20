import { RequestHandler } from "express";
import config from "../../config";
import DoctorModel from "../../model/docterModel";
import { CustomError } from "../../utils/helper/customError";
import { HttpStatusCode } from "axios";
import AppointmentModel from "../../model/appointmentModel";
import { AppointmentStatus } from "../../utils/enum/common.enum";
import { Types } from "mongoose";
import { start } from "node:repl";

class PatientController {
  getDoctorDetails: RequestHandler = async (req, res, next) => {
    try {
      const { specialization, page } = req.query;
      const limit = parseInt(config.commonConfig.pageLimit);
      const skip = (parseInt(page as string) - 1) * limit;

      const query: any = { isDeleted: false };
      if (specialization) {
        query.specialization = specialization;
      }

      const doctors = await DoctorModel.find(query)
        .select("-password")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalDoctors = await DoctorModel.countDocuments({
        isDeleted: false,
      });

      res.status(HttpStatusCode.Ok).json({
        success: true,
        message: "Doctors fetched successfully",
        pagination: {
          totalDoctors,
          currentPage: page,
          totalPages: Math.ceil(totalDoctors / limit),
          limit,
        },
        data: doctors.map((doc) => ({
          ...doc.toObject(),
          doctor_profile: doc.doctor_profile
            ? `http://localhost:${config.commonConfig.port}/uploads/${doc.doctor_profile}`
            : null,
        })),
      });
    } catch (error) {
      next(
        new CustomError(
          "Unable to fetch doctors list",
          HttpStatusCode.InternalServerError,
        ),
      );
    }
  };
  createAppointment: RequestHandler = async (req: any, res, next) => {
    try {
      const patientId = req.users?.id;

      const { doctorId } = req.body;

      if (!doctorId) {
        return next(
          new CustomError(
            "No doctor selected for appointment",
            HttpStatusCode.BadRequest,
          ),
        );
      }

      const doctorDetails = await DoctorModel.findById(doctorId);

      if (!doctorDetails) {
        return next(
          new CustomError("Doctor not found", HttpStatusCode.NotFound),
        );
      }

      const existingAppointment = await AppointmentModel.findOne({
        doctorId,
        patientId,
        status: { $eq: AppointmentStatus.PENDING },
      });

      if (existingAppointment) {
        return next(
          new CustomError(
            "You already have an appointment booked with this doctor on this date",
            HttpStatusCode.BadRequest,
          ),
        );
      }

      const appointment = await AppointmentModel.create({
        doctorId,
        patientId,
        status: AppointmentStatus.PENDING,
      });

      return res.status(HttpStatusCode.Created).json({
        success: true,
        message: "Appointment booked successfully",
        data: appointment,
      });
    } catch (error) {
      next(
        new CustomError(
          "Unable to book appointment",
          HttpStatusCode.InternalServerError,
        ),
      );
    }
  };
  getMyAppointments: RequestHandler = async (req: any, res, next) => {
    try {
      const patientId = req.users?.id;
      const { status, page = 1 } = req.query;
      const limit = parseInt(config.commonConfig.pageLimit);
      const skip = (parseInt(page as string) - 1) * limit;

      const appointmentsDetails = await AppointmentModel.aggregate([
        {
          $match: {
            patientId: new Types.ObjectId(patientId),
            ...(status ? { status } : {}),
          },
        },
        {
          $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctorDetails",
          },
        },
        { $unwind: "$doctorDetails" },
        {
          $project: {
            doctorId: 1,
            patientId: 1,
            createdAt: 1,
            status: 1,
            doctorDetails: {
              name: 1,
              specialization: 1,
              startTime: 1,
              endTime: 1,
            },
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]);

      const totalAppointments = await AppointmentModel.countDocuments({
        patientId: new Types.ObjectId(patientId),
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

  cancelAppointment: RequestHandler = async (req: any, res, next) => {
    try {
      const patientId = req.users?.id;
      const appointmentId = req.params.id;

      const appointment = await AppointmentModel.findByIdAndUpdate(
        {
          appointmentId,
          patientId: new Types.ObjectId(patientId),
          status: { $eq: AppointmentStatus.PENDING },
        },
        { status: AppointmentStatus.CANCELLED },
        { new: true },
      );

      if (!appointment) {
        return next(
          new CustomError(
            "You are not authorized to cancel this appointment",
            HttpStatusCode.MethodNotAllowed,
          ),
        );
      }

      return res.status(HttpStatusCode.Ok).json({
        success: true,
        message: "Appointment cancelled successfully",
        data: appointment,
      });
    } catch (error) {
      next(
        new CustomError(
          "Unable to cancel appointment",
          HttpStatusCode.InternalServerError,
        ),
      );
    }
  };
}

export default new PatientController();
