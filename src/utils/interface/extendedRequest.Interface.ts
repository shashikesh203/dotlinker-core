import { Request } from "express";

export interface ExtendedRequest extends Request {
  users?: {
    id: string;
    roles?: string;
  };
}   