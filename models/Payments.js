const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payments', {
    PaymentID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    BookingID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Bookings',
        key: 'BookingID'
      },
      unique: "UQ__Payments__73951ACC44F6534B"
    },
    Amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    PaymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    PaymentMethod: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Status: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'Payments',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Payments__9B556A588717E529",
        unique: true,
        fields: [
          { name: "PaymentID" },
        ]
      },
      {
        name: "UQ__Payments__73951ACC44F6534B",
        unique: true,
        fields: [
          { name: "BookingID" },
        ]
      },
    ]
  });
};
