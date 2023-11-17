import { Request, Response } from "express";
import { createOrder } from "../../domain/client/ordered";

export function orderController(req: Request, res: Response) {
    console.log(req.params, req.query, req.body);
    
    createOrder(req.body.name);
    // req.body.dishes.forEach(order_list: { name: string, ingredientes: { name: string, quantity: number }[] }) => {
    //     let dish_name = order_list.name;
    //     let dish_ingredient = order_list.ingredientes
    //     orderPost(dish_name, dish_ingredient);
    // }
    
}