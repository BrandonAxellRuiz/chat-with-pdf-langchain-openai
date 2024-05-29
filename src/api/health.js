import express from "express";
const router = express.Router();

router.get("/api/health", async (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

export default router;
