import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "PostImage",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      url: { type: DataTypes.TEXT, allowNull: false }
    },
    { tableName: "post_images", underscored: true, timestamps: true, indexes: [{ unique: true, fields: ["post_id", "url"] }] }
  );
