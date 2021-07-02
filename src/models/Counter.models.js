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
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Counter Name is required." },
                notEmpty: { msg: "Counter Name should not be empty." },
              },
            },
        
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "Counter", 
    }
  );


  return Counter;
};
