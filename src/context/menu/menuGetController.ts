import { Request, Response } from "express";
import { getMenuDishes } from "../../domain/menu/dish_menu";

export function getMenuController(req: Request, res: Response) {
    console.log(req.params, req.query, req.body);

    req.body.forEach((order_list: { name: string }) => {
        let dish_name = order_list.name;
        console.log("name:",dish_name,"\ningredients:")
        getMenuDishes(dish_name);
    });
    
}