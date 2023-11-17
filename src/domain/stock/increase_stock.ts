import { Request, Response } from "express";
import stockJson from "../../infra/stock.json"

export function increaseStock(req: Request, res: Response) {

    console.log(req.params, req.query, req.body);
    req.body.newstock.forEach((ingrediente_list: { name: string, quantity: number }) => {
        const ingredienteindex = stockJson.stock.findIndex(ingrediente => ingrediente.name == ingrediente_list.name)
        if (ingredienteindex == -1) {
            // let update_stock: { name: string, quantity: number } =
            // {
            //     "name": ingrediente_list.name,
            //     "quantity": ingrediente_list.quantity
            // }
            // console.log("New ingredient add")
            stockJson.stock.push(ingrediente_list)
            // console.log(stockJson)
        } else {
            // console.log("Passou")
            stockJson.stock[ingredienteindex].quantity = stockJson.stock[ingredienteindex].quantity + ingrediente_list.quantity

        }
    });
    res.json(stockJson)

}