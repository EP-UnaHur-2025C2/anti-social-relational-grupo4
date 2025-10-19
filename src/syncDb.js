import { sequelize } from "./models/index.js";

const syncDb = async () => {
  try {
    await sequelize.sync({ force: true }); // borra y recrea tablas
    console.log("✅ DB sincronizada correctamente");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error syncing DB:", err);
    process.exit(1);
  }
};

syncDb();