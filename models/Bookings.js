const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bookings', {
    BookingID: {
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
    BookingDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Status: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "pending"
    },
    TotalPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Bookings',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Bookings__73951ACD76A5327B",
        unique: true,
        fields: [
          { name: "BookingID" },
        ]
      },
    ]
  });
};
