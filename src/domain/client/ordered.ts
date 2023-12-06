import { Request, Response } from "express";
import Dish from "../../db/models/dish"
import Stock from "../../db/models/stocks"
import Dishstock from "../../db/models/dishes_stocks"
import sequelize from "../../db/config"
import { Serializer } from "jsonapi-serializer";

export async function createOrder(dishList: { dishId: number }[]) {
  const t = await sequelize.transaction();
  const serializer = new Serializer('dishes', {
      attributes: ['name'],
      ingredients: {
        ref: 'id',
        attributes: ['dishId','stockId','quantity'],
        included: false,
        relationshipLinks: {
          self: '/dishes/{id}/relationships/ingredients',
          related: '/dishes/{id}/ingredients',
        },
      }
    }); 
  try {
    let dishOrderList: {}[] = [];
    for (let dish of dishList) {
      let dishExist = await Dish.findOne({ where: { id: dish.dishId }, transaction: t })
      if (!dishExist) {
        throw new Error("Dishes not exists")
      }
      let dishesStock = await Dishstock.findAll({ where: { dishId: dish.dishId }, transaction: t })
      if (dishesStock.length == 0) {
        throw new Error("Dish not exists in dishes_stock table")
      }
      // for (let dishesObject of dishesStock) {
      //   await Stock.decrement('quantity', {
      //     by: dishesObject.dataValues.quantity,
      //     where: { id: dishesObject.dataValues.stockId },
      //     transaction: t
      //   });
      // }
      dishOrderList.push(dishExist)
      dishOrderList.push(dishesStock)
    }
    console.log("Vendo a ordem:\n",dishOrderList)
    return serializer.serialize(dishOrderList).data
  }catch (error: any) {
    await t.rollback();
    throw new Error(error.message)
  }
}