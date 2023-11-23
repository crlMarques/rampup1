import { Request, Response } from "express";
import Dish  from "../../db/models/dish"

export async function addDish(dishList: { name: string }[]) {
    for (let dishName of dishList) {
        let dishExist = await Dish.findCreateFind({ where: { name: dishName.name } })
        if (!dishExist) {
            const [dish, newDish] = await Dish.findCreateFind({
                where: { name: dishName.name },
                defaults: { name: dishName.name },
            });
            if (!newDish) {
                throw new Error("Error in generate new Dish")
            }
        }else{
            throw new Error("Dish already exists")
        }
    }
}