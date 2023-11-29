import { Request, Response } from "express";
import Stock  from "../../db/models/stocks"

export async function increaseStock(stockList: { name: string, quantity: number }[]) {
    let result = "Stock updated,\n"
    for (let stock of stockList) {
        const [updateStock, newStock] = await Stock.findOrCreate({ 
            where: { name: stock.name },
            defaults: {
                quantity: stock.quantity
            }
        })
        if (updateStock) {
            await updateStock.increment('quantity', { by: stock.quantity });
            result +=`ingredient: ${stock.name}, quantity: ${updateStock.dataValues.quantity}\n`
        } 
    }
    return result
}