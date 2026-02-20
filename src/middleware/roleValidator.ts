import { Response, NextFunction } from "express";
import { HttpStatusCode } from "axios";
import { ExtendedRequest } from "../utils/interface/extendedRequest.Interface";
import { UserRole } from "../utils/enum/common.enum";

export  function isDoctor(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userRoles = req.users?.roles;
    if(userRoles !== UserRole.DOCTOR) {
      return res.status(HttpStatusCode.Forbidden).json({
        message: "Forbidden", 
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(HttpStatusCode.Unauthorized).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
}

export  function isPatient(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userRoles = req.users?.roles;
    if(userRoles !== UserRole.PATIENT) {
      return res.status(HttpStatusCode.Forbidden).json({
        message: "Forbidden", 
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(HttpStatusCode.Unauthorized).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
}
