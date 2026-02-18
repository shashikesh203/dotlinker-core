import { RequestHandler } from "express";
import config from "../../config";
import DoctorModel from "../../model/docterModel";
import { CustomError } from "../../utils/helper/customError";
import { HttpStatusCode } from "axios";

class PatientController {
getDoctorDetails: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { specialization , page } = req.query;
    const limit = parseInt(config.commonConfig.pageLimit);
    const skip = (parseInt(page as string) - 1) * limit;

    const query: any = { isDeleted: false };
    if(specialization){
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
        HttpStatusCode.InternalServerError
      )
    );
  }
};
}

export default new PatientController();
