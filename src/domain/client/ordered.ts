import { Request, Response } from "express";
import Dish  from "../../db/models/dish"
import Stock  from "../../db/models/stocks"
import Dishstock  from "../../db/models/dishes_stocks"
import { Op } from 'sequelize';

export async function createOrder(dishList: {dishId: number}[]) {
  for
  let dishesMenu = Dishstock.findOne({ where: { dishId: dishId } })
      .then(existingDish => {
          if (existingDish) {
              ingredients.forEach((ingrediente_list: { stockId: number, quantity: number }) => {
                const requestQuantity = existingDish.dataValues.quantity + ingrediente_list.quantity
                Stock.decrement('quantity', {
                  by: requestQuantity,
                  where: { id: ingrediente_list.stockId }
                })
                .then(() => {
                  return true
                })
                .catch((error) => {
                  throw error('Error to decrease stock quantity:', error);
                })
              });
          } else {
              throw new Error('Dish already register');
          }
      }).catch(error => {
          console.error('Error to search dishId:', error);
    });
}
