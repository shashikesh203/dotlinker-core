import { RequestHandler } from "express";
import DoctorModel from "../../model/docterModel";
import { HttpStatusCode } from "axios";
import { CustomError } from "../../utils/helper/customError";
import { UserRole } from "../../utils/enum/common.enum";
import generateJwtToken from "../../utils/helper/generateJwtToken";
import bcryptjs from "bcryptjs";
import config from "../../config";

class AuthController {
  doctorSignUp: RequestHandler = async (req, res, next) => {
    const {
      name,
      email,
      password,
      specialization,
      description,
    } = req.body;

    try {
      let doctorDetails = await DoctorModel.findOne({
        email: email,
        isDeleted: false,
      });

      if (!doctorDetails) {
        const hashPassword = bcryptjs.hashSync(password, config.commonConfig.saltRounds);
        doctorDetails = await DoctorModel.create({
          name: name,
          email: email,
          password: hashPassword,
          specialization: specialization,
          description: description,
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
        userId: doctorDetails._id.toString(),
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
      next(new CustomError("invalid credentials", HttpStatusCode.Unauthorized));
    }
  };
}

export default new AuthController();
