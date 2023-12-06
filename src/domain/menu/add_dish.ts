import { Request, Response } from "express";
import Dish  from "../../db/models/dish"
import sequelize from "../../db/config"
import { Serializer } from "jsonapi-serializer";

export async function addDish(dishList: { name: string }[]) {
    const t = await sequelize.transaction();
    const serializer = new Serializer('dishes', {
        attributes: ['name'],
      });
    try {
        let dishAddList: {}[] = [];
        for (let dishName of dishList) {
            const [dish, newDish] = await Dish.findCreateFind({
                where: { name: dishName.name },
                defaults: { name: dishName.name },
                transaction: t
            });
            dishAddList.push(dish)
            if (!newDish) {
                throw new Error(`Error in generate new Dish, ${dishName.name} already exist`)
            }
        }
        return serializer.serialize(dishAddList).data
    }catch (error: any) {
        await t.rollback();
        throw new Error(error.message)
    }
}