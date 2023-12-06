import { Request, Response } from "express";
import { removeDish } from "../../domain/menu/remove_dish";

export async function dellMenuController(req: Request, res: Response) {
    let dishList = req.body
    try {
        let dish = await removeDish(dishList);
        res.status(200).json(dish);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}