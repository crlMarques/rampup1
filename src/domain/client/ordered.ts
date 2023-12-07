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
    let dishIngredientList: {dataValues: [Object]}[] = [];
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
      //   await Stock.decrement('quantity', {
      //     by: dishesObject.dataValues.quantity,
      //     where: { id: dishesObject.dataValues.stockId },
      //     transaction: t
      //   });
        dishIngredientList.push(dishesObject.dataValues)
       }
      dishOrderList.push(dishExist)
      
    }
    console.log("\n\n", dishIngredientList )
    console.log("\n\n", dishOrderList )
    const serializedIngredients = ingredientSerializer.serialize(dishIngredientList);
    console.log("Vendo o ingred serializer:\n",serializedIngredients)
    const serializedDish = dishSerializer.serialize(dishOrderList);
    console.log("Vendo o ingred serializerDish:\n",serializedDish)
    serializedDish.included = serializedIngredients.data;
    console.log("\n\n\nBora ver o serialize final: \n\n", serializedDish)
    return serializedDish
  }catch (error: any) {
    await t.rollback();
    throw new Error(error.message)
  }
}