'use strict';

module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });

  State.associate = (models) => {
    models.State.belongsTo(models.Country, {
      foreignKey: {
        name: 'country_id'
      }
    });
    models.State.hasMany(models.City, {
      foreignKey: 'state_id'
    });
  }
  return State;
};