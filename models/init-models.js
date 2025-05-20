var DataTypes = require("sequelize").DataTypes;
var _Bookings = require("./Bookings");
var _Categories = require("./Categories");
var _Destinations = require("./Destinations");
var _Packages = require("./Packages");
var _Payments = require("./Payments");
var _Reviews = require("./Reviews");
var _Roles = require("./Roles");
var _Users = require("./Users");

function initModels(sequelize) {
  var Bookings = _Bookings(sequelize, DataTypes);
  var Categories = _Categories(sequelize, DataTypes);
  var Destinations = _Destinations(sequelize, DataTypes);
  var Packages = _Packages(sequelize, DataTypes);
  var Payments = _Payments(sequelize, DataTypes);
  var Reviews = _Reviews(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Payments.belongsTo(Bookings, { as: "Booking", foreignKey: "BookingID"});
  Bookings.hasOne(Payments, { as: "Payment", foreignKey: "BookingID"});
  Packages.belongsTo(Categories, { as: "Category", foreignKey: "CategoryID"});
  Categories.hasMany(Packages, { as: "Packages", foreignKey: "CategoryID"});
  Packages.belongsTo(Destinations, { as: "Destination", foreignKey: "DestinationID"});
  Destinations.hasMany(Packages, { as: "Packages", foreignKey: "DestinationID"});
  Bookings.belongsTo(Packages, { as: "Package", foreignKey: "PackageID"});
  Packages.hasMany(Bookings, { as: "Bookings", foreignKey: "PackageID"});
  Reviews.belongsTo(Packages, { as: "Package", foreignKey: "PackageID"});
  Packages.hasMany(Reviews, { as: "Reviews", foreignKey: "PackageID"});
  Users.belongsTo(Roles, { as: "Role", foreignKey: "RoleID"});
  Roles.hasMany(Users, { as: "Users", foreignKey: "RoleID"});
  Bookings.belongsTo(Users, { as: "User", foreignKey: "UserID"});
  Users.hasMany(Bookings, { as: "Bookings", foreignKey: "UserID"});
  Reviews.belongsTo(Users, { as: "User", foreignKey: "UserID"});
  Users.hasMany(Reviews, { as: "Reviews", foreignKey: "UserID"});

  return {
    Bookings,
    Categories,
    Destinations,
    Packages,
    Payments,
    Reviews,
    Roles,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
