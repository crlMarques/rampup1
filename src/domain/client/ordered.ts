import { Request, Response } from "express";
import Dish  from "../../db/models/dish"

export async function createOrder(name: String) { //, ingredients: {name: string, quantity: number}[]
    console.log("Log name:",name)
    await Dish.create({ name: name});
    //ingredients.forEach((ingrediente_list: { name: string, quantity: number }) => {
        // const ingredienteindex = stockJson.stock.findIndex(ingrediente => ingrediente.name == ingrediente_list.name)
        // if (ingredienteindex == -1) {
        //     console.log("This ingredient is not available")
        // } else if (stockJson.stock[ingredienteindex].quantity == 0) {
        //     console.log("Missing ingredient")
        // } else if (stockJson.stock[ingredienteindex].quantity - ingrediente_list.quantity >= 0) {
        //     stockJson.stock[ingredienteindex].quantity = stockJson.stock[ingredienteindex].quantity - ingrediente_list.quantity
        //     console.log("Subtraindo ingrediente da receita:", ingrediente_list.name, "Da receita:", order_list.name)
        // } else {
        //     console.log("Insufficient amount of ingredients for the recipe")
        // }
    //});
}