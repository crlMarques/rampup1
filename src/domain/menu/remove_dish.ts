import { Request, Response } from "express";
import Dish  from "../../db/models/dish"

export function removeDish(dish_name: String) {

    Dish.findOne({ where: { name: dish_name } })
    .then(existingDish => {
        if (existingDish) {
            throw new Error('Dish already register');
        }else{
            Dish.create({ name: dish_name })
            .then(newDish => {
                console.log('New dish created:', newDish);
              }).catch(err => {
                console.error('Error to creat Dish:', err);
              });
        }
    });
}