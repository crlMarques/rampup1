import { Request, Response } from "express";
import Stock  from "../../db/models/stocks"

export async function increaseStock(name: string, quantity: number) {

    Stock.findOrCreate({ 
        where: { name: name },
        defaults: {
            quantity: quantity
        }
    }).then(([ingredient, newIngredient]) => {
        if (!newIngredient) {
            ingredient.increment('quantity', { by: quantity });
            console.log(`Ingredient quantity ${name} updated.`);
        }else{
            console.log(`New ingredient ${name} creat.`);
        }
    }).catch (error => {
        console.error('Erro ao atualizar ou criar o ingrediente:', error);
    });
}