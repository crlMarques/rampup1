import { Request, Response } from "express";
import { removeDish } from "../../domain/menu/remove_dish";

export function dellMenuController(req: Request, res: Response) {
    console.log(req.params, req.query, req.body);

    req.body.forEach((order_list: { name: string }) => {
        let dish_name = order_list.name;
        console.log("name:",dish_name)
        removeDish(dish_name);
    });
    
}