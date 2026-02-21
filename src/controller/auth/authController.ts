import { RequestHandler } from "express";
import DoctorModel from "../../model/docterModel";
import { HttpStatusCode } from "axios";
import { CustomError } from "../../utils/helper/customError";
import { UserRole } from "../../utils/enum/common.enum";
import generateJwtToken from "../../utils/helper/generateJwtToken";
import bcryptjs from "bcryptjs";
import config from "../../config";
import PatientModel from "../../model/patientModel";

class AuthController {
  doctorSignUp: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      let doctorDetails = await DoctorModel.findOne({
        email: email,
        isDeleted: false,
      });

      if (!doctorDetails) {
        const hashPassword = bcryptjs.hashSync(
          password,
          config.commonConfig.saltRounds,
        );
        doctorDetails = await DoctorModel.create({
          ...req.body,
          password: hashPassword,
          doctor_profile: req.file ? req.file.filename : undefined,
        });
      } else {
        return next(
          new CustomError(
            "Account already exists, Please Login",
            HttpStatusCode.BadRequest,
          ),
        );
      }

      if (doctorDetails.isDeleted) {
        return next(
          new CustomError(
            "Your account has been deleted. Please contact admin to restore your account.",
            HttpStatusCode.Unauthorized,
          ),
        );
      }

      const payload = {
        id: doctorDetails._id.toString(),
        email: doctorDetails.email,
        roles: UserRole.DOCTOR,
      };

      res.status(HttpStatusCode.Created).json({
        data: {
          token: generateJwtToken(payload),
        },
        message: "Doctor signed up successfully!",
      });
    } catch (error: any) {
      next(new CustomError("Something went wrong", HttpStatusCode.InternalServerError));
    }
  };

  doctorSignIn: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const doctorDetails = await DoctorModel.findOne({
        email: email,
        isDeleted: false,
      });

      if (!doctorDetails) {
        return next(
          new CustomError(
            "Account does not exist, Please Signup",
            HttpStatusCode.BadRequest,
          ),
        );
      }

      if (doctorDetails.isDeleted) {
        return next(
          new CustomError(
            "Your account has been deleted. Please contact admin to restore your account.",
            HttpStatusCode.Unauthorized,
          ),
        );
      }

      const isPasswordValid = bcryptjs.compareSync(
        password,
        doctorDetails.password,
      );

      if (!isPasswordValid) {
        return next(
          new CustomError(
            "Invalid email or password",
            HttpStatusCode.BadRequest,
          ),
        );
      }

      const payload = {
        id: doctorDetails._id.toString(),
        email: doctorDetails.email,
        roles: UserRole.DOCTOR,
      };

      res.status(HttpStatusCode.Ok).json({
        data: {
          token: generateJwtToken(payload),
        },
        message: "Doctor signed in successfully!",
      });
    } catch (error: any) {
      next(
        new CustomError(
          "Something went wrong",
          HttpStatusCode.InternalServerError,
        ),
      );
    }
  };

  patientSignUp: RequestHandler = async (req, res, next) => {
    const { name, email, age, password, gender } = req.body;    
    try {
      let patientDetails = await PatientModel.findOne({
        email: email,
        isDeleted: false,
      });

      if (!patientDetails) {
        const hashPassword = bcryptjs.hashSync(
          password,
          config.commonConfig.saltRounds,
        );
        patientDetails = await PatientModel.create({
          name: name,
          email: email,
          age: age,
          password: hashPassword,
          gender: gender,
          patient_profile: req.file ? req.file.filename : undefined,
        });
      } else {
        return next(
          new CustomError(
            "Account already exists, Please Login",
            HttpStatusCode.BadRequest,
          ),
        );
      }

      if (patientDetails.isDeleted) {
        return next(
          new CustomError(
            "Your account has been deleted. Please contact admin to restore your account.",
            HttpStatusCode.Unauthorized,
          ),
        );
      }

      const payload = {
        id: patientDetails._id.toString(),
        email: patientDetails.email,
        roles: UserRole.PATIENT,
      };

      res.status(HttpStatusCode.Created).json({
        data: {
          token: generateJwtToken(payload),
        },
        message: "Patient signed up successfully!",
      });
    } catch (error: any) {
      next(new CustomError("invalid credentials", HttpStatusCode.Unauthorized));
    }
  };

  patientSignIn: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const patientDetails = await PatientModel.findOne({
        email: email,
        isDeleted: false,
      });

      if (!patientDetails) {
        return next(
          new CustomError(
            "Account does not exist, Please Signup",
            HttpStatusCode.BadRequest,
          ),
        );
      }

      if (patientDetails.isDeleted) {
        return next(
          new CustomError(
            "Your account has been deleted. Please contact admin to restore your account.",
            HttpStatusCode.Unauthorized,
          ),
        );
      }

      const isPasswordValid = bcryptjs.compareSync(
        password,
        patientDetails.password,
      );

      if (!isPasswordValid) {
        return next(
          new CustomError(
            "Invalid email or password",
            HttpStatusCode.BadRequest,
          ),
        );
      }

      const payload = {
        id: patientDetails._id.toString(),
        email: patientDetails.email,
        roles: UserRole.PATIENT,
      };

      res.status(HttpStatusCode.Ok).json({
        data: {
          token: generateJwtToken(payload),
        },
        message: "Patient signed in successfully!",
      });
    } catch (error: any) {
      next(
        new CustomError(
          "Something went wrong",
          HttpStatusCode.InternalServerError,
        ),
      );
    }
  };
}

export default new AuthController();
