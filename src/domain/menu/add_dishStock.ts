import { Request, Response } from "express";
import Dish from "../../db/models/dish"
import Stock from "../../db/models/stocks"
import DishStock from "../../db/models/dishes_stocks"
import sequelize from "../../db/config"
import { Serializer } from "jsonapi-serializer";
import { Op } from "sequelize"

export async function addDishSTock(dishDataList:{ name:string, ingredient: { name: string, quantity: number, dishId: number, stockId: number }[]}[]) {
    const t = await sequelize.transaction();
    const serializer = new Serializer('dishes', {
        attributes: ['name'],
    });
    try {
        let dishList: {}[] = [];
        //dishDataList.forEach(async data => {
        for (let data of dishDataList) {
            for (let dishData of data.ingredient) {
                let ingredientExist = await Stock.findOne({ where: { name: dishData.name }, transaction: t } )
                if (!ingredientExist) {
                    throw new Error(`Ingredient not exists: ${dishData.name}`)
                }
                console.log("\n\nVendo o ingredientExist:", ingredientExist)
                console.log("\n\nVendo o dishData:", dishData)
                const [dishStock, newDishStock] = await DishStock.findOrCreate({
                    where: {
                        dishId: dishData.dishId,
                        stockId: dishData.stockId
                        // [Op.and]: [
                        //     { dishId: {[Op.not]: dishData.dishId}  },
                        //     { stockId: {[Op.not]: dishData.stockId}  }
                        // ]
                    },
                    defaults: {
                        ingredient: dishData.name,
                        quantity: dishData.quantity,
                        dishId: dishData.dishId,
                        stockId: dishData.stockId
                    },
                    transaction: t
                });
                console.log("\n\nVendo o dishSTock:", dishStock)
                dishList.push(dishStock)
                if (!newDishStock) {
                    console.log(newDishStock,dishStock)
                    throw new Error(`Error in generate new Dish , ${dishData.name} already exist`)
                    //console.log("Ja temos esse ingrediente")
                }
            }
        }; 
        let serializedDish = serializer.serialize(dishList).data
        await t.commit();
        return serializedDish
    } catch (error: any) {
        await t.rollback();
        throw new Error(error.message)
    }
}