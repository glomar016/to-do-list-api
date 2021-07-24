// ------------------------------------------------------------------------ START OF MODEL ----------------------------------------------------------------------------------- //
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

// class Guide. Guide should be name of the file name.
  class Bus_driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
        // Default in every static associate
        this.belongsTo(models.User, {
            foreignKey: "created_by",
            type: DataTypes.UUID
        });

        // Default in every static associate
        this.belongsTo(models.User, {
            foreignKey: "updated_by",
            type: DataTypes.UUID
        });

        // Add your additional association here
        this.belongsTo(models.User, {
            foreignKey: "driverUserId",
            as: "busDriver",
            type: DataTypes.UUID
        });
        // End of your additional association 
    }
  }
  
  // Change Guide.init to {{Filename}}.init 
  Bus_driver.init(
    {
        // Default column this is a primary key
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        // Default column this is the status of the row if it is deleted or active
        status: {
            type: DataTypes.STRING(255),
            defaultValue: "Active",
        },

        // Default column this is associate to user model who create the data
        created_by: {
            type: DataTypes.UUID,
            references: {
                model: sequelize.User,
                key: "id"
            }
        },

        // Default column this is associate to user model who update the data

        updated_by: {
            type: DataTypes.UUID,
            references: {
                model: sequelize.User,
                key: "id"
            }
        },
    
        // Add your additional columns here 
  
        // Could be driver or conductor
        name: {
            type: DataTypes.STRING(255),
            allowNull: true, 
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: true, 
        },



        // End of additional columns 
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "Bus_driver", // Change model name base on file name
    }
  );

  // Change Guide to file name first letter should be in upper case
  return Bus_driver;
};
// ------------------------------------------------------------------------ END OF MODEL ----------------------------------------------------------------------------------- //