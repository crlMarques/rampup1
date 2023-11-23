import { Request, Response } from "express";
import Dish  from "../../db/models/dish"

export async function removeDish(dishList: { name: string }[]) {
    for (let dishName of dishList) {
        let dishExist = await Dish.findOne({ where: { name: dishName.name } })
        if (!dishExist) {
            throw new Error("Dishes not exists")
        }
        await Dish.destroy({ where: {
            name: dishName.name 
        }})
    }
}