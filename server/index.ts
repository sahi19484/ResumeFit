import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleExtract } from "./routes/extract";

// api/index.ts
import serverless from "serverless-http";

// Dynamically import your Express app
// (adjust the path if your server entry point differs)
import app from "../server/index";

export default serverless(app);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/extract", handleExtract);
  app.get("/api/extract", handleExtract);

  return app;
}
