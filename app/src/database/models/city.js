'use strict';

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{timestamps:false});

  City.associate = (models) => {
    models.City.belongsTo(models.State, {
      foreignKey: {
        name: 'state_id'
      }
    });
  }
  return City;
};