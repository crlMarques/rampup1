import { Request, Response } from "express";
import Dish  from "../../db/models/dish"
import sequelize from "../../db/config"
import { Serializer } from "jsonapi-serializer";
import { addDishStock } from "./add_dishStock";

export async function addDish(dishList: { name: string, ingredient: { name: string, quantity: number}[]}) {
    const t = await sequelize.transaction();
    const serializer = new Serializer('dishes', {
        attributes: ['name'],
      });
    try {
        const [dish, newDish] = await Dish.findOrCreate({
            where: { name: dishList.name },
            defaults: { name: dishList.name },
            transaction: t
        });
        if (!newDish) {
            throw new Error(`Error in generate new Dish, ${dishList.name} already exist`)
        }
        console.log("\n\nVendo o dish:", dish)
        let dishStock = await addDishStock(dishList.ingredient, dish.dataValues.id, t)
        console.log("\n\n Vendo a saida do addDish:", dishStock)
        let serializedDish = serializer.serialize(dish).data
        serializedDish.include = dishStock;
        await t.commit();
        return serializedDish
    }catch (error: any) {
        await t.rollback();
        throw new Error(error.message)
    }
}