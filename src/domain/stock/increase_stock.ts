import { Request, Response } from "express";
import Stock  from "../../db/models/stocks"
import sequelize from "../../db/config"
import { Serializer } from "jsonapi-serializer";

export async function increaseStock(stockList: { name: string, quantity: number }[]) {
    const t = await sequelize.transaction();
    const serializer = new Serializer('stock', {
        attributes: ['name', 'quantity'],
      });
    try {
        let ingredientList: {}[] = [];
        for (let stock of stockList) {
            const [updateStock, newStock] = await Stock.findOrCreate({ 
                where: { name: stock.name },
                defaults: {
                    quantity: stock.quantity
                }
            })
            if (!newStock) {
                console.log("\n\nNovo ingrediente tbm:",updateStock )
                await updateStock.increment('quantity', { by: stock.quantity });
                ingredientList.push(updateStock)
            }else{
                ingredientList.push(updateStock)
            }
        }
        await t.commit();
        let serializedIngredients = serializer.serialize(ingredientList).data
        return serializedIngredients
    }catch (error: any) {
        await t.rollback();
        throw new Error(error.message)
    }
}