import { Request, Response } from "express";
import Dish  from "../../db/models/dish"
import Stock  from "../../db/models/stocks"
import { Op } from 'sequelize';

export async function createOrder(name: String, ingredients: {name: string, quantity: number}[]) {
    Dish.findOne({ where: { name: name } })
    .then(existingDish => {
        if (existingDish) {
            ingredients.forEach((ingrediente_list: { name: string, quantity: number }) => {
                Stock.findOne({
                    where: {
                      name: name,
                      quantity: {
                        [Op.gt]: ingrediente_list.quantity
                      }
                    }
                  }).then(stock => {
                    if (stock) {
                      console.log('Stock found and quantity is greater than zero:', stock);
                      return Stock.decrement('quantity', {
                        by: ingrediente_list.quantity,
                        where: { name: ingrediente_list.name }
                      });
                    } else {
                      console.log('Stock not found or quantity is zero');
                    }
                  }).catch(error => {
                    console.error('Error when searching for stock:', error);
                  });
            });
        } else {
            throw new Error('Dish already register');
        }
    }).catch(error => {
        console.error('Error to search Name:', error);
    });
}