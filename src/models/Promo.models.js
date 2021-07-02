"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

  class Promo extends Model {

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
  Promo.init(
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
    
        code: {
            type: DataTypes.STRING(500),
            allowNull: true, 
        }, 
        fixedDiscount: {
            type: DataTypes.STRING (500),
            allowNull: true, 
        },
        percentageDiscount:  {
            type: DataTypes.STRING(500),
            allowNull: true, 
        },
        minimumAmount:  {
            type: DataTypes.STRING(500),
            allowNull: true, 
        },
        minimumSeatReservation:  {
            type: DataTypes.STRING(500),
            allowNull: true, 
        },
        bookingDateTo:  {
            type: DataTypes.DATE,
            allowNull: true, 
        },
        bookingDateFrom:  {
            type: DataTypes.DATE,
            allowNull: true, 
        },
        tavelDateTo:  {
            type: DataTypes.DATE,
            allowNull: true, 
        },
        travelDateFrom:  {
            type: DataTypes.DATE,
            allowNull: true, 
        },
        effectivityDate:  {
            type: DataTypes.DATE,
            allowNull: true, 
        },
        deactivationDate:  {
            type: DataTypes.DATE,
            allowNull: true, 
        },
       
     
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "Promo", 
    }
  );

  return Promo;
};