import { Request, Response } from "express";
import Dish  from "../../db/models/dish"
import { Serializer } from "jsonapi-serializer";

export async function getMenuDishes() {
  const serializer = new Serializer('dishes', {
    attributes: ['name'],
  });
  let dishList = await Dish.findAll()
  if (!dishList) {
    throw new Error("Dishes not exists")
  }
  // console.log(dishesDataValues)
  const serializedData = serializer.serialize(dishList);
  //console.log("Bora ver o serialize:", serializedData.data)
  return serializedData.data
}