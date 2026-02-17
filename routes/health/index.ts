import express from "express";

const healthRoute = express.Router();

healthRoute.get("/health", (_req, res) => {
  res.json({ message: "Health check passed ✅", timeStamp: new Date().toISOString() });
});

export default healthRoute;