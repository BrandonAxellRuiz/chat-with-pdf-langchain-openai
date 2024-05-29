import express from "express";
import { listEmbeddingDirectories } from "../services/documentService.js";
import { logger } from "../utils/logger.js";

const router = express.Router();

router.get("/list-embeddings", (req, res) => {
  try {
    const directories = listEmbeddingDirectories();
    res.json({ success: true, directories });
  } catch (error) {
    logger.error(`Error in /list-embeddings: ${error}`);
    res.status(500).json({
      success: false,
      message: "Failed to list embedding directories.",
    });
  }
});

export default router;
