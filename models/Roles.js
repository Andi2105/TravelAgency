const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Roles', {
    RoleID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RoleName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "UQ__Roles__8A2B616086C29B15"
    }
  }, {
    sequelize,
    tableName: 'Roles',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Roles__8AFACE3A183940F5",
        unique: true,
        fields: [
          { name: "RoleID" },
        ]
      },
      {
        name: "UQ__Roles__8A2B616086C29B15",
        unique: true,
        fields: [
          { name: "RoleName" },
        ]
      },
    ]
  });
};
