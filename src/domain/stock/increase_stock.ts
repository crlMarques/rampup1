import { Request, Response } from "express";
import Stock  from "../../db/models/stocks"

export async function increaseStock(stockList: { name: string, quantity: number }[]) {
    for (let stock of stockList) {
        const [updateStock, newStock] = await Stock.findOrCreate({ 
            where: { name: stock.name },
            defaults: {
                quantity: stock.quantity
            }
        })
        if (updateStock) {
            await updateStock.increment('quantity', { by: stock.quantity });
            var update = "Stock updated"
          } else {
            var newIngredient = "New ingredient included"
          }
    }
    //return true preciso validar essa saida
}