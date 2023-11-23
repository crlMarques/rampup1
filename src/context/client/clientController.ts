import { Request, Response } from "express";
import { createOrder } from "../../domain/client/ordered";

export function orderController(req: Request, res: Response) {
    console.log(req.params, req.query, req.body);

    req.body.forEach((order_list: { dishId: number, ingredients: { stockId: number, quantity: number }[] }) => {
        let dish_id = order_list.dishId;
        let dish_ingredients = order_list.ingredients
        console.log("id:",dish_id,"\ningredients:", dish_ingredients)

        try {
            createOrder(dish_id, dish_ingredients)
            res.status(200).json({ message: 'Função retornou true' });
        } catch (error) {
            res.status(500).json({ message: 'Função retornou false' });
        }
    });
    
}