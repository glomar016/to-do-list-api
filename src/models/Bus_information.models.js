"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

  class Bus_information extends Model {
   
    static associate(models) {
    
        this.belongsTo(models.User, {
            foreignKey: "created_by",
            type: DataTypes.UUID
        });

        this.belongsTo(models.User, {
            foreignKey: "updated_by",
            type: DataTypes.UUID
        });

        this.belongsTo(models.Bus_template, {
            foreignKey: "templateId" ,
            as: "busTemplateId",
            type: DataTypes.UUID
        });

        this.belongsTo(models.Bus_type, {
            foreignKey: "typeId",
            as: "busTypeId",
            type: DataTypes.UUID
        });

        this.hasMany(models.Bus_driver , {
            foreignKey: "busInformationId",
            type: DataTypes.UUID
        });
    }
  }
  

  Bus_information.init(
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

        number: {
            type: DataTypes.STRING,
            allowNull: true,
           
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fileNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plateNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        engineNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        chasisNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        denomination: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pistonPlacement: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fuel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        make: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        series: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bodyType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bodyNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        yearModel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        grossWeight: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        netWeight: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shippingWeight: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        netCapacity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hasWifi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hasAircon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hasTelevision: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },

    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "Bus_information",
    }
  );


  return Bus_information;
};