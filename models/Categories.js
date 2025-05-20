const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Categories', {
    CategoryID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__Categori__737584F6AB35DEA8"
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Categories',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Categori__19093A2BF484CBDD",
        unique: true,
        fields: [
          { name: "CategoryID" },
        ]
      },
      {
        name: "UQ__Categori__737584F6AB35DEA8",
        unique: true,
        fields: [
          { name: "Name" },
        ]
      },
    ]
  });
};
