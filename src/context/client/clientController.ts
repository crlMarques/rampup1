import { Request, Response } from "express";
import { createOrder } from "../../domain/client/ordered";

export function orderController(req: Request, res: Response) {
    console.log(req.params, req.query, req.body);

    req.body.forEach((order_list: { name: string, ingredients: { name: string, quantity: number }[] }) => {
        let dish_name = order_list.name;
        let dish_ingredients = order_list.ingredients
        console.log("name:",dish_name,"\ningredients:", dish_ingredients)
        //createOrder(dish_name, dish_ingredients);
    });
    
}