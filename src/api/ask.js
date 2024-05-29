import express from "express";
import { getAnswer } from "../services/openAiService.js";
import { logger } from "../utils/logger.js";

const router = express.Router();

router.get("/chat-pdf", async (req, res) => {
  try {
    if (!req.query.docEmbedding && !req.params.docEmbedding) {
      return res.status(400).json({ error: "docEmbedding is required" });
    }

    const docEmbedding = req.params.docEmbedding || req.query.docEmbedding;
    const question =
      req.query.question ||
      "Dame un resumen completo de la informacion que parezca importante";

    const answer = await getAnswer(docEmbedding, question);
    res.json({ result: answer });
  } catch (error) {
    logger.error(`Error in /ask: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
