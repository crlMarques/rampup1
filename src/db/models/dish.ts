const { Sequelize, DataTypes } = require('sequelize');
import sequelize from "../config"

const Dish = sequelize.define('dishes', {
  // Model attributes are defined here
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  }
});

// `sequelize.define` also returns the model
console.log(Dish === sequelize.models.Dish); // true

export default Dish