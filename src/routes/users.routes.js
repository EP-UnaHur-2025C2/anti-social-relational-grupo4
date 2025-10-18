import express from "express";
import { User } from "../models/index.js";

const router = express.Router();

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const { nickName, email, displayName, password } = req.body;
    const user = await User.create({ nickName, email, displayName, password });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Listar usuarios
router.get("/", async (req, res) => {
  const users = await User.findAll({ attributes: ["id", "nickName", "email", "displayName", "createdAt"] });
  res.json(users);
});

export default router;
