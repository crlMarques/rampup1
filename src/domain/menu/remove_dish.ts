import { Request, Response } from "express";
import Dish  from "../../db/models/dish";
import { Serializer } from "jsonapi-serializer";
import sequelize from "../../db/config"

export async function removeDish(dishList: { name: string }[]) {
    const t = await sequelize.transaction();
    const serializer = new Serializer('dishes', {
        attributes: ['name'],
      });
    try {
        let dishRemoveList: {}[] = [];
        for (let dishName of dishList) {
            let dishExist = await Dish.findOne({ where: { name: dishName.name }, transaction: t } )
            if (!dishExist) {
                throw new Error(`Dish not exists: ${dishName.name}`)
            }
            await Dish.destroy({ where: {
                name: dishName.name 
            }, transaction: t })
            dishRemoveList.push(dishExist)
        }// opcao de remover o laco for, dessa forma passaria um array para buscar e deletar os dados.
        await t.commit();
        let serializedDish = serializer.serialize(dishRemoveList).data;
        return serializedDish
    }catch (error: any) {
        await t.rollback();
        throw new Error(error.message)
    }
   
}