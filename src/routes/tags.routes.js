import express from "express";
import { Tag } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
});

export default router;
