import { Request, Response } from "express";
import { addDish } from "../../domain/menu/add_dish";

export function addMenuController(req: Request, res: Response) {
    console.log(req.params, req.query, req.body);

    req.body.forEach((order_list: { name: string }) => {
        let dish_name = order_list.name;
        console.log("name:",dish_name)
        addDish(dish_name);
    });
    
}