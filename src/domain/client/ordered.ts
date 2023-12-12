import { Request, Response } from "express";
import Dish from "../../db/models/dish"
import Stock from "../../db/models/stocks"
import Dishstock from "../../db/models/dishes_stocks"
import sequelize from "../../db/config"
import { Serializer } from "jsonapi-serializer";
import { Op } from "sequelize"

export async function createOrder(dishList: { dishId: number }[]) {
  const t = await sequelize.transaction();
  const ingredientSerializer = new Serializer('ingredients', {
    attributes: ['name', 'quantity']
  });
  const dishSerializer = new Serializer('dishes', {
    attributes: ['name'],
    ingredients: {
      ref: 'id',
      attributes: ['dishId', 'stockId', 'quantity'],
      included: true
    }
  });
  try {
    let dishOrderList: {}[] = [];
    let dishIngredientList: {}[] = [];
    for (let dish of dishList) {
      let dishExist = await Dish.findOne({ where: { id: dish.dishId }, transaction: t })
      if (!dishExist) {
        throw new Error("Dishes not exists")
      }
      let dishesStock = await Dishstock.findAll({ where: { dishId: dish.dishId }, transaction: t })
      if (dishesStock.length == 0) {
        let dishOrderList: {}[] = [];
        throw new Error("Dish not exists in dishes_stock table")
      }
      for (let dishesObject of dishesStock) {
        const [updatedStock, changedLines] = await Stock.decrement('quantity', {
          by: dishesObject.dataValues.quantity,
          where: {
            id: dishesObject.dataValues.stockId,
            quantity: {
              [Op.gte]: dishesObject.dataValues.quantity
            }
          },
          transaction: t
        });
        let stock: any = updatedStock[0]
        dishIngredientList.push(stock[0])
      }
      dishOrderList.push(dishExist)
    }
    const serializedIngredients = ingredientSerializer.serialize(dishIngredientList);
    const serializedDish = dishSerializer.serialize(dishOrderList);
    serializedDish.included = serializedIngredients.data;
    await t.commit();
    return serializedDish
  } catch (error: any) {
    await t.rollback();
    throw new Error(error.message)
  }
}