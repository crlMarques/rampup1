import { Request, Response } from "express";
import data from "../../infra/menu.json"
import Dish  from "../../db/models/dish"

export async function getMenuDishes() {
  let dishList = await Dish.findAll()
  if (!dishList) {
    throw new Error("Dishes not exists")
}

}