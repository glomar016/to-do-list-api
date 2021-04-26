"use strict";
const { Model } = require("sequelize");

// const PROTECTED_ATTRIBUTES = ["password", "birth_date"]

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "taskUserId",
        type: DataTypes.UUID
      });

      this.belongsTo(models.User, {
        foreignKey: "created_by",
        type: DataTypes.UUID
      });

      this.belongsTo(models.User, {
        foreignKey: "updated_by",
        type: DataTypes.UUID
      });

    }
  }
  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      taskName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Task name should not be null." },
          notEmpty: { msg: "Task name should not be empty." },
        },
      },
      taskdescription: {
        type: DataTypes.STRING,
      },
      taskDueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
      },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: "date_created",
      updatedAt: "date_updated",
      modelName: "task",
    }
  );

  return Task;
};