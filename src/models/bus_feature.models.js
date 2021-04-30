// ------------------------------------------------------------------------ START OF MODEL ----------------------------------------------------------------------------------- //
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    // class Guide. Guide should be name of the file name.
  class Bus_feature extends Model {
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
        this.belongsTo(models.Bus_information , {
            foreignKey: "informationId",
            type: DataTypes.UUID
        });

    // End of your additional association 
    }
  }
  
  // Change Guide.init to {{Filename}}.init 
  Bus_feature.init(
    {
        // Default column this is a primary key
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        // Default column this is the status of the row if it is deleted or active
        status: {
            type: DataTypes.STRING,
            defaultValue: "Active",
        },

        // Default column this is associate to user model who create the data
        created_by: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id"
            }
        },

        // Default column this is associate to user model who update the data
        updated_by: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id"
            }
        },
    
        // Add your additional columns here 
        informationId: {
            type: DataTypes.UUID,
            allowNull: true, 
        }, 
        feature: {
            type: DataTypes.STRING(255),
            validate: {
                notNull: { msg: "Column name should not be null." },         // if column cannot be null
            },
        },
        // End of additional columns 
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "Bus_feature", // Change model name base on file name
    }
  );

  // Change Guide to file name first letter should be in upper case
  return Bus_feature;
};
// ------------------------------------------------------------------------ END OF MODEL ----------------------------------------------------------------------------------- //