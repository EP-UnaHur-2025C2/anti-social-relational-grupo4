import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Tag",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
    },
    { tableName: "tags", underscored: true, timestamps: true }
  );
