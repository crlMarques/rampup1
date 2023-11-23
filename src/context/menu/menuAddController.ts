import { Request, Response } from "express";
import { addDish } from "../../domain/menu/add_dish";

export async function addMenuController(req: Request, res: Response) {
    let dishList = req.body
    try {
        await addDish(dishList);
        res.status(200).json({ message: 'Função retornou true' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
    
}