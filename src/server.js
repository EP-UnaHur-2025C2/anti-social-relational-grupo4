import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { sequelize } from "./models/index.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    // sincroniza modelos en DB (solo para dev). En prod usar migraciones.
    await sequelize.sync({ alter: true });
    console.log("✅ DB connected and models synced");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();
