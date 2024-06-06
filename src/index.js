import express from "express";
import http from "http";
import dotenv from "dotenv";

// Import routers
import healthRouter from "./api/health.js";
import askRouter from "./api/ask.js";
import uploadRouter from "./api/upload.js";
import listEmbeddingRouter from "./api/list-embeddings.js";

// Import utilities
import { logger } from "./utils/logger.js";

// Load environment configuration
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Fallback port if not specified in .env

// Express middleware to parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API routers
app.use("/api", healthRouter);
app.use("/api", askRouter);
app.use("/api", uploadRouter);
app.use("/api", listEmbeddingRouter);

// Create HTTP server and listen on configured port
http.createServer(app).listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
