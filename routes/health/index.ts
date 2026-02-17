import express from "express";
import healthController from "../../src/controller/health/healthController";

const healthRoute = express.Router();

healthRoute.get("/health", healthController.getHealth);

export default healthRoute;
