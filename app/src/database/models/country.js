'use strict';

module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    sortname: DataTypes.STRING,
    name: DataTypes.STRING,
    phoneCode: DataTypes.INTEGER
  },{timestamps:false});

  Country.associate = (models) => {
    models.Country.hasMany(models.State, {
      foreignKey: 'country_id'
    });
  }

  return Country;
};