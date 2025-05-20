const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Destinations', {
    DestinationID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Country: {
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
    }
  }, {
    sequelize,
    tableName: 'Destinations',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Destinat__DB5FE4AC9FC2B1B4",
        unique: true,
        fields: [
          { name: "DestinationID" },
        ]
      },
    ]
  });
};
