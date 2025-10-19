import express from "express";
import { Comment, Post, User } from "../models/index.js";

const router = express.Router();

router.post("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    // ¡ESPERAMOS 'text'!
    const { authorId, text } = req.body; 

    // ¡VALIDAMOS 'text'! (Cambiamos el mensaje para que sea obvio)
    if (!text) return res.status(400).json({ error: "text content is required (Expected key: 'text')" });

    // Verificar que el post exista
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: "post not found" });

    // Verificar que el usuario exista
    const user = await User.findByPk(authorId);
    if (!user) return res.status(404).json({ error: "user not found" });

    // Crear comentario
    const comment = await Comment.create({
      post_id: postId,
      author_id: authorId,
      text: text, 
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error("ERROR DETALLE (DB ERROR):", err);
    
    // Incluimos el stack por si la falla es después de la validación
    res.status(500).json({ 
      error: "could not create comment", 
      detail: err.message, 
      stack: err.stack 
    });
  }
});

export default router;