"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Landmark extends Model {
    static associate(models) {
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
  Landmark.init(
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
        name: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
              notNull: { msg: "Landmark Name is required." },
              notEmpty: { msg: "Landmark Name should not be empty." },
            },
        },
        kmFromOrigin: {
            type: DataTypes.STRING(500),
            allowNull: true, 
        },
        effectivityDate: {
            type: DataTypes.DATE,
            allowNull: true, 
        },
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "Landmark",
    }
  );
  return Landmark;
};