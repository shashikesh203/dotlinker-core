import { RequestHandler } from "express";

class HealthController {
 
  getHealth: RequestHandler = async (_req, res) => {
    res.status(200).json({ status: "OK", message: "Health check passed!" });
  };
}

export default new HealthController();
