import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Post, PostImage, Tag, User, Comment } from "../models/index.js";
import { Op } from "sequelize";

const router = express.Router();

// Multer setup
const uploadDir = process.env.UPLOADS_DIR || "src/uploads/images";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  },
});
const upload = multer({ storage });

// Crear post con tags opcionales
router.post("/", async (req, res) => {
  try {
    const { authorId, description, tags = [] } = req.body;
    if (!description) return res.status(400).json({ error: "description required" });

    const post = await Post.create({ description, author_id: authorId });

    // crear/ asociar tags
    for (const t of tags) {
      const [tag] = await Tag.findOrCreate({ where: { name: t } });
      await post.addTag(tag);
    }

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "could not create post" });
  }
});

// Subir imágenes a post
router.post("/:postId/images", upload.array("images", 6), async (req, res) => {
  try {
    const { postId } = req.params;
    if (!req.files || req.files.length === 0) return res.status(400).json({ error: "no files" });

    const created = [];
    for (const f of req.files) {
      const url = `/uploads/images/${f.filename}`;
      const img = await PostImage.create({ post_id: postId, url });
      created.push(img);
    }
    res.status(201).json({ images: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "upload failed" });
  }
});

// Listar posts con imágenes, tags, autor y comentarios recientes
router.get("/", async (req, res) => {
  try {
    const months = parseInt(process.env.COMMENT_VISIBLE_MONTHS || 6);
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);

    const posts = await Post.findAll({
      include: [
        { model: PostImage, as: "images" },
        { model: Tag, as: "tags" },
        {
          model: User,
          as: "author",
          attributes: ["id", "nickName", "displayName"],
        },
        {
          model: Comment,
          as: "comments",
          where: { createdAt: { [Op.gte]: cutoff } },
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "could not fetch posts" });
  }
});

export default router;
