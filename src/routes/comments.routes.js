import express from "express";
import { Comment } from "../models/index.js";

const router = express.Router();

router.post("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { authorId, body } = req.body;
    if (!body) return res.status(400).json({ error: "body required" });

    const comment = await Comment.create({ post_id: postId, author_id: authorId, body });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "could not create comment" });
  }
});

export default router;
