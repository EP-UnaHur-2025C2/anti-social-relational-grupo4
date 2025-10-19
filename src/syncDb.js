import { sequelize } from "./models/index.js";

const syncDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("TABLAS CREADAS/REINICIADAS CORRECTAMENTE");
    process.exit(0);
  } catch (error) {
    console.error("ERROR AL SINCRONIZAR DB:", error);
    process.exit(1);
  }
};

syncDb();
