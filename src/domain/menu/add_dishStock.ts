import { Request, Response } from "express";
import Dish from "../../db/models/dish"
import Stock from "../../db/models/stocks"
import DishStock from "../../db/models/dishes_stocks"
import sequelize from "../../db/config"
import { Serializer } from "jsonapi-serializer";
import { Op, Transaction } from "sequelize"

export async function addDishStock(dishDataList:{name: string, quantity: number}[], dishId:number, t:Transaction ) {
    const serializer = new Serializer('ingredient', {
        attributes: ['ingredient', 'stockId', 'quantity'],
    });
        let dishList: {}[] = [];
        for (let dishData of dishDataList) {
            let ingredientExist = await Stock.findOne({ where: { name: dishData.name }, transaction: t } )
            if (!ingredientExist) {
                throw new Error(`Ingredient not exists: ${dishData.name}`)
            }
            const [dishStock, newDishStock] = await DishStock.findOrCreate({
                where: {
                    [Op.and]: [
                        { dishId: dishId  },
                        { stockId: ingredientExist.dataValues.id }
                    ]
                },
                defaults: {
                    ingredient: dishData.name,
                    dishId: dishId,
                    quantity: dishData.quantity,
                    stockId: ingredientExist.dataValues.id
                },
                transaction: t
            });
            dishList.push(dishStock)
            if (!newDishStock) {
                throw new Error(`Error in generate new Dish , ${dishData.name} already exist`)
            }
        }
        let serializedDish = serializer.serialize(dishList).data
        return serializedDish
}