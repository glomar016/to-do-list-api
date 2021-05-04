"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

  class Counter extends Model {

    static associate(models) {
      

        this.belongsTo(models.User, {
            foreignKey: "created_by",
            type: DataTypes.UUID
        });


        this.belongsTo(models.User, {
            foreignKey: "updated_by",
            type: DataTypes.UUID
        });

        this.belongsTo(models.Counter , {
            foreignKey: "terminalId",
            type: DataTypes.UUID
        });

    }
  }
  

  Counter.init(
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
    
 
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notNull: { msg: "Terminal Name is required." },
                notEmpty: { msg: "Terminal Name should not be empty." },
              },
            },
        
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "counter", 
    }
  );


  return Counter;
};
