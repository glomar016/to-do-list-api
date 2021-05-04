"use strict";
const { entries } = require("lodash");
const { type } = require("node:os");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    // class Guide. Guide should be name of the file name.
  class Bus_feature extends Model {
     
    static associate(models) {
      

        this.belongsTo(models.User, {
            foreignKey: "created_by",
            type: DataTypes.UUID
        });

        this.belongsTo(models.User, {
            foreignKey: "updated_by",
            type: DataTypes.UUID
        });

        this.belongsTo(models.Bus_information , {
            foreignKey: "informationId",
            type: DataTypes.UUID
        });


    }
  }
  
 
  Bus_feature.init(
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
                model: User,
                key: "id"
            }
        },

        updated_by: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id"
            }
        },
        
        feature: {
            type: DataTypes.STRING,
            allowNull: true, 
            },
        },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "bus_feature", 
    }
  );

  
  return Bus_feature;
};