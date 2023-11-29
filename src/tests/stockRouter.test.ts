// exemplo.test.ts
import { increaseStock } from '../domain/stock/increase_stock';
import { addDish } from "../domain/menu/add_dish";
import { getMenuDishes } from "../domain/menu/dish_menu";
import { removeDish } from "../domain/menu/remove_dish";
import { createOrder } from "../domain/client/ordered";
import crypto from 'crypto'
import stockList from '../infra/stock.json';

let teste = [{
    "name": "limão",
    "quantity": 1
}]

let dishList = [{
        "name": crypto.randomBytes(8).toString('hex')
}]

let dishRemove = [{
    "name": crypto.randomBytes(8).toString('hex')
}]

let dishOrder = [{
    "dishId": 1
}]

describe('Test stock use case', () => {
    test('Increase stock test', async () => {
        expect(await increaseStock(teste)).toBe("Stock updated,\ningredient: limão, quantity: 85\n");
    });
}); 

describe('Test menu use case', () => {
    test('Add dish test', async () => {
        expect(await addDish(dishList)).toBe(`Menu updated:\nNew dish: ${dishList[0].name}\n`);
        await removeDish(dishList)
    });

        test('Dell dish test', async () => {
        await addDish(dishRemove)  
        expect(await removeDish(dishRemove)).toBe(`Menu updated:\nDish removed: ${dishRemove[0].name}\n`);   
    });

     test('Get dish test', async () => {
         expect(await getMenuDishes()).toBe("Dish menu:\nPizza\nX-Burguer\nLasanha\nSalmão Grelhado\nRisoto de Cogumelos\nStrogonoff de Frango\nFeijoada\nNhoque de Batata\nSalada Caesar\nHambúrguer com Batata Frita\nPenne ao Molho Pesto\n");
         //limitar quantos pratos eu desejo ver.
     });
}); 

describe('Test client use case', () => {
    test('Client ordered', async () => {
        expect(await createOrder(dishOrder)).toBe("Dish order:\n- Pizza\n");
    });
});