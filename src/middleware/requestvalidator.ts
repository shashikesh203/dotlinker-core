import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { Express } from "express";
import { HttpStatusCode } from "axios";
import { PayloadType } from "../utils/enum/common.enum";

interface FormDataFiles {
  [fieldname: string]: Express.Multer.File[];
}

export function validateRequest({
  schema,
  type = PayloadType.BODY,
}: {
  schema: AnySchema;
  type?: PayloadType;
}) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const dataToValidate: Record<string, any> = { ...req[type] };
     
      if (req.file) {
        dataToValidate[req.file.fieldname] = req.file;
      } else if (req.files) {
        Object.keys(req.files).forEach((key) => {
          dataToValidate[key] = req.files[key][0];
        });
      }
      await schema.validate(dataToValidate, { abortEarly: false });
      next();
    } catch (err: any) {
      const fieldErrors: Record<string, string> = {};
      if (err.inner && err.inner.length > 0) {
        err.inner.forEach((e: any) => {
          if (e.path && !fieldErrors[e.path]) {
            fieldErrors[e.path] = e.message;
          }
        });
      }

      return _res.status(HttpStatusCode.BadRequest).json({
        success: false,
        errors: fieldErrors,
      });
    }
  };
}
