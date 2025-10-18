import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "User",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      nickName: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      displayName: { type: DataTypes.STRING(100), allowNull: true },
      password: { type: DataTypes.STRING(255), allowNull: true }
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );
