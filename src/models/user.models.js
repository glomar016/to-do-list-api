// ------------------------------------------------------------------------ START OF MODEL ----------------------------------------------------------------------------------- //
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    // class Guide. Guide should be name of the file name.
    class User extends Model {
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
        
    // End of your additional association 
    }
  }
  
  // Change Guide.init to {{Filename}}.init 
  User.init(
    {
        // Default column this is a primary key
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        // Default column this is the status of the row if it is deleted or active
        status: {
            type: DataTypes.STRING(60),
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
    
        // Add your additional columns here //
        firstName: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        middleName: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        
        lastName: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true, 
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: {
                msg: "Email address already exist."
            },
            isEmail: {
                msg: "Email is invalid."
            }, 
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        municipality: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        province: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        country: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        zipCode: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        securityQuestion: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        answer: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        password: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        photo: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        position: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        employeeNumber: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        userType: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        
        // End of additional columns //
    },
    {
        sequelize,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        modelName: "user", // Change model name base on file name
    }
  );

  // Change Guide to file name first letter should be in upper case
  return User;
};
// ------------------------------------------------------------------------ END OF MODEL ----------------------------------------------------------------------------------- //