module.exports = function(sequelize, DataTypes) {
  var VirtualBox = sequelize.define("VirtualBox", {
    box_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },   
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: { type: DataTypes.STRING 
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
    },
    tag: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return VirtualBox;
};

