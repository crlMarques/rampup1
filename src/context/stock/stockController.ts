import { Request, Response } from "express";
import { increaseStock } from "../../domain/stock/increase_stock";

export async function stockController(req: Request, res: Response) {
    let stockList = req.body
    try {
        let stock = await increaseStock(stockList);
        res.status(200).json(stock);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
    
}