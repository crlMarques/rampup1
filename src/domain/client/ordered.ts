import { Request, Response } from "express";
import Dish from "../../db/models/dish"
import Stock from "../../db/models/stocks"
import Dishstock from "../../db/models/dishes_stocks"
import { Op } from 'sequelize';

export async function createOrder(dishList: { dishId: number }[]) {
  let result = "Dish order:\n"
  for (let dish of dishList) {
    let dishExist = await Dish.findOne({ where: { id: dish.dishId } })
    if (!dishExist) {
      throw new Error("Dishes not exists")
    }
    let dishesStock = await Dishstock.findAll({ where: { dishId: dish.dishId } })
    if (dishesStock.length == 0) {
      throw new Error("Dish not exists in dishes_stock table")
    }
    for (let dishesObject of dishesStock) {
      await Stock.decrement('quantity', {
        by: dishesObject.dataValues.quantity,
        where: { id: dishesObject.dataValues.stockId }
      });
    }
    result +=`- ${dishExist.dataValues.name}\n`
  }

  return result
}