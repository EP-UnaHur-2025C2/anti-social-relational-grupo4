import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Post",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      description: { type: DataTypes.TEXT, allowNull: false }
    },
    { tableName: "posts", underscored: true, timestamps: true }
  );
