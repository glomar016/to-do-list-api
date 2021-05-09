"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

  class Bus_schedule extends Model {

    static associate(models) {

        this.belongsTo(models.User, {
            foreignKey: "created_by",
            type: DataTypes.UUID        
        });
        this.belongsTo(models.User, {
            foreignKey: "updated_by",
            type: DataTypes.UUID
        });
        this.belongsTo(models.Schedule, {
            foreignKey: "informationId",
            type: DataTypes.UUID
        });
        this.belongsTo(models.Bus_information, {
            foreignKey: "scheduleId",
            type: DataTypes.UUID
        });
    }
  }
  Bus_schedule.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Active",
        },
        created_by: {
            type: DataTypes.UUID,
            references: {
                model: sequelize.User,
                key: "id"
            }
        },
        updated_by: {
            type: DataTypes.UUID,
            references: {
                model: sequelize.User,
                key: "id"
            }
        },
     
        scheduleDate: {
            type: DataTypes.DATE,
            allowNull: true, 
        }, 
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "Bus_schedule", 
    }
  );

  return Bus_schedule;
};