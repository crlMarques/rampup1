import { Request, Response } from "express";
import Dish  from "../../db/models/dish"

export async function addDish(dishList: { name: string }[]) {
    let result = "Menu updated:\n"
    for (let dishName of dishList) {
        const [dish, newDish] = await Dish.findCreateFind({
            where: { name: dishName.name },
            defaults: { name: dishName.name },
        });
        result +=`New dish: ${dishName.name}\n`
        if (!newDish) {
            throw new Error("Error in generate new Dish, Dish already exist")
        }
    }
    return result
}