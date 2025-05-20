const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Packages', {
    PackageID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DestinationID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Destinations',
        key: 'DestinationID'
      }
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'CategoryID'
      }
    }
  }, {
    sequelize,
    tableName: 'Packages',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Packages__322035EC6852CFC8",
        unique: true,
        fields: [
          { name: "PackageID" },
        ]
      },
    ]
  });
};
