import { Request, Response } from "express";
import Dish  from "../../db/models/dish"
import { Serializer } from "jsonapi-serializer";
import sequelize from "../../db/config"

export async function getMenuDishes() {
  const t = await sequelize.transaction();
  const serializer = new Serializer('dishes', {
      attributes: ['name'],
    });
  try {
    let dishList = await Dish.findAll()
    if (!dishList) {
      throw new Error("Dishes not exists")
    }
    await t.commit();
    const serializedData = serializer.serialize(dishList).data;
    return serializedData
  }catch (error: any) {
    await t.rollback();
    throw new Error(error.message)
  }
}