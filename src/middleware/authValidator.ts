import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../utils/helper/customError";
import { HttpStatusCode } from "axios";
import { ExtendedRequest } from "../utils/interface/extendedRequest.Interface";
import config from "../config";

interface DecodedToken extends JwtPayload {
  id: string;
  roles?: string;
}

export default function authorization(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authorizationToken = req.headers.authorization;

    if (!authorizationToken || !authorizationToken.startsWith("Bearer ")) {
      return res.status(HttpStatusCode.Unauthorized).json({
        message: "Token is unauthorized",
        success: false,
      });
    }

    const token = authorizationToken.split(" ")[1];

    const decoded = jwt.verify(
      token,
      config.commonConfig.jwtSecret,
    ) as DecodedToken;

    if (!decoded.id) {
      return res.status(HttpStatusCode.Unauthorized).json({
        message: "Authorization failed!",
        success: false,
      });
    }

    req.users = {
      id: decoded.id,
      roles: decoded.roles,
    };

    next();
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(HttpStatusCode.Unauthorized).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
}
