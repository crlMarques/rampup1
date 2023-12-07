import { Request, Response } from "express";
import Dish from "../../db/models/dish"
import Stock from "../../db/models/stocks"
import Dishstock from "../../db/models/dishes_stocks"
import sequelize from "../../db/config"
import { Serializer } from "jsonapi-serializer";

export async function createOrder(dishList: { dishId: number }[]) {
  const t = await sequelize.transaction();
  const ingredientSerializer = new Serializer('ingredients', {
    attributes: ['id','quantity', 'dishId','stockId']
  });
  const dishSerializer = new Serializer('dishes', {
      attributes: ['name'],
      ingredients: {
        ref: 'id',
        attributes: ['dishId','stockId','quantity'],
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
      if (dishesStock.length == 0) {let dishOrderList: {}[] = [];
        throw new Error("Dish not exists in dishes_stock table")
      }
       for (let dishesObject of dishesStock) {
        // const [updatedStock, changedLines] = await Stock.decrement('quantity', {
        //   by: dishesObject.dataValues.quantity,
        //   where: { id: dishesObject.dataValues.stockId },
        //   transaction: t
        // });
        // console.log("\n\nVendo stock atualizado:", updatedStock)
        // dishIngredientList = updatedStock
       }
      const idsDosIngredientes = dishesStock.map(stockId => stockId.dataValues.stockId);
      const quantidadesParaDecrementar = dishesStock.map(stockQtd => stockQtd.dataValues.quantity);
      console.log("\n\nVendo os maps:\n\n",idsDosIngredientes,quantidadesParaDecrementar)
      dishOrderList.push(dishExist)
    }
    await t.commit();
    const serializedIngredients = ingredientSerializer.serialize(dishIngredientList);
    const serializedDish = dishSerializer.serialize(dishOrderList);
    serializedDish.included = serializedIngredients.data;
    return serializedDish
  }catch (error: any) {
    await t.rollback();
    throw new Error(error.message)
  }
}