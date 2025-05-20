const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__Users__A9D10534DBD3BEEF"
    },
    Phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Roles',
        key: 'RoleID'
      }
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Users__1788CCAC6E79C6A8",
        unique: true,
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "UQ__Users__A9D10534DBD3BEEF",
        unique: true,
        fields: [
          { name: "Email" },
        ]
      },
    ]
  });
};
