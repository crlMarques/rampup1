import { Request, Response } from "express";
import { getMenuDishes } from "../../domain/menu/dish_menu";

export async function getMenuController(req: Request, res: Response) {
    try {
        let dish = await getMenuDishes();
        res.status(200).json({ message: dish });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
    
}