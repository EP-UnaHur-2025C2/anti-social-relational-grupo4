import express from "express";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dotenv from "dotenv";
dotenv.config();

import usersRouter from "./routes/users.routes.js";
import postsRouter from "./routes/posts.routes.js";
import commentsRouter from "./routes/comments.routes.js";
import tagsRouter from "./routes/tags.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Swagger
const swaggerDocument = YAML.load(path.join(process.cwd(), "src", "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Static files (images)
app.use("/uploads/images", express.static(path.join(process.cwd(), process.env.UPLOADS_DIR || "src/uploads/images")));

// Routes
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/tags", tagsRouter);

app.get("/", (req, res) => res.json({ ok: true, message: "UnaHur API running" }));

export default app;
