import { Request, Response } from "express";
import data from "../../infra/menu.json"
import Dish  from "../../db/models/dish"

export function getMenuDishes(dish_name: String) {

    Dish.findAll()
        .then(products => {
            console.log('All dishes:');
        products.forEach(product => {
            console.log(product);
        });
  })
  .catch(err => {
    console.error('Error to get product:', err);
  });

}