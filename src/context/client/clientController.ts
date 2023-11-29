import { Request, Response } from "express";
import { createOrder } from "../../domain/client/ordered";

export async function orderController(req: Request, res: Response) {
    let dishList = req.body
    try {
        let dish = await createOrder(dishList)
        res.status(200).json({ message: dish });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }   
}