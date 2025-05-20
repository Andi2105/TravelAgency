const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reviews', {
    ReviewID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'UserID'
      }
    },
    PackageID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Packages',
        key: 'PackageID'
      }
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ReviewDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Reviews',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Reviews__74BC79AE7EC1C663",
        unique: true,
        fields: [
          { name: "ReviewID" },
        ]
      },
    ]
  });
};
