"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {


  class Chart_of_account extends Model {
  
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
  
 
  Chart_of_account.init({

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
                    notEmpty: { msg: "Chart of account name is required."},
                    notNull: { msg: "Chart of account name is required."},
                },
        },

        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "Chart_of_account", 
    });

  return Chart_of_account;
};
