import { Request, Response } from "express";
import { increaseStock } from "../../domain/stock/increase_stock";

export function stockController(req: Request, res: Response) {

    req.body.forEach((order_list: { name: string, quantity: number }) => {
        let stock_name = order_list.name;
        let stock_quantity = order_list.quantity;
        increaseStock(stock_name, stock_quantity);
    });
    
}