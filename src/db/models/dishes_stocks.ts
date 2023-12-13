const { Sequelize, DataTypes } = require('sequelize');
import sequelize from "../config"

const Dishstock = sequelize.define('dishes_stocks', {
  // Model attributes are defined here
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
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
  },
  dishId: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'dishes',
        schema: 'public'
      },
      key: 'id'
    },
    allowNull: false
  },
  stockId: {
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'stocks',
        schema: 'public'
      },
      key: 'id'
    },
    allowNull: false
  },
  ingredient: {
    type: Sequelize.DataTypes.STRING,
    references: {
      model: {
        tableName: 'stocks',
        schema: 'public'
      },
      key: 'name'
    },
    allowNull: false
  }
});

// `sequelize.define` also returns the model
console.log(Dishstock === sequelize.models.Dish); // true

export default Dishstock