const { Sequelize, DataTypes } = require('sequelize');
import sequelize from "../config"

const Stock = sequelize.define('stock', {
  // Model attributes are defined here
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
});

// `sequelize.define` also returns the model
console.log(Stock === sequelize.models.Dish); // true

export default Stock