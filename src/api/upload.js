import express from "express";
import multer from "multer";
import { ingestDocuments } from "../services/documentService.js";
import { logger } from "../utils/logger.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporarily save files to "uploads" directory

router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    if (req.files) {
      await ingestDocuments(req.files);
      res.send({ success: true, message: "Files processed successfully." });
    } else {
      res.status(400).send({ success: false, message: "No files uploaded." });
    }
  } catch (error) {
    logger.error(`Error processing uploaded files: ${error}`);
    res
      .status(500)
      .send({ success: false, message: "Error processing files." });
  }
});

export default router;
