// exemplo.test.ts
import { increaseStock } from '../domain/stock/increase_stock';
import { addDish } from "../domain/menu/add_dish";
import { getMenuDishes } from "../domain/menu/dish_menu";
import { removeDish } from "../domain/menu/remove_dish";
import { createOrder } from "../domain/client/ordered";
import crypto from 'crypto'
import stockList from '../infra/stock.json';

let newStock = [{
    "name": crypto.randomBytes(8).toString('hex'),
    "quantity": 50
}]

let newDish = {
    "name": crypto.randomBytes(8).toString('hex'),
    "ingredient": [
        {
            "name": `${newStock[0].name}`,
            "quantity": 1
        }
    ]
}
let dishRemove = [{
    "name": `${newDish.name}`
}]

let dishOrder = [{
    "dishId": 1
}]

describe('Test stock use case', () => {
    test('Increase stock test', async () => {
        let ingredient = await increaseStock(newStock)
        console.log(ingredient)
        expect(ingredient[0].attributes).toStrictEqual({
            "name": `${newStock[0].name}`,
            "quantity": 50
        })
    });
});

describe('Test menu use case', () => {
    test('Add dish test', async () => {
        expect(await addDish(newDish)).toStrictEqual({
            "type": "dishes",
            "id": "59",//muda+1
            "attributes": {
                "name": `${newDish.name}`
            },
            "include": [
                {
                    "type": "ingredients",
                    "id": "38",//muda+1
                    "attributes": {
                        "ingredient": `${newStock[0].name}`,
                        "stock-id": 64,//muda+1
                        "quantity": 1
                    }
                }
            ]
        });
    });

    test('Dell dish test', async () => {
        expect(await removeDish(dishRemove)).toStrictEqual([
            {
                "type": "dishes",
                "id": "59",//muda+1
                "attributes": {
                    "name": `${newDish.name}`
                }
            }
        ]);
    });

    test('Get dish test', async () => {
        expect(await getMenuDishes()).toStrictEqual([
            {
                "type": "dishes",
                "id": "1",
                "attributes": {
                    "name": "Pizza"
                }
            },
            {
                "type": "dishes",
                "id": "2",
                "attributes": {
                    "name": "X-Burguer"
                }
            },
            {
                "type": "dishes",
                "id": "3",
                "attributes": {
                    "name": "Lasanha"
                }
            },
            {
                "type": "dishes",
                "id": "4",
                "attributes": {
                    "name": "Salmão Grelhado"
                }
            },
            {
                "type": "dishes",
                "id": "5",
                "attributes": {
                    "name": "Risoto de Cogumelos"
                }
            },
            {
                "type": "dishes",
                "id": "6",
                "attributes": {
                    "name": "Strogonoff de Frango"
                }
            },
            {
                "type": "dishes",
                "id": "7",
                "attributes": {
                    "name": "Feijoada"
                }
            },
            {
                "type": "dishes",
                "id": "8",
                "attributes": {
                    "name": "Nhoque de Batata"
                }
            },
            {
                "type": "dishes",
                "id": "9",
                "attributes": {
                    "name": "Salada Caesar"
                }
            },
            {
                "type": "dishes",
                "id": "10",
                "attributes": {
                    "name": "Hambúrguer com Batata Frita"
                }
            },
            {
                "type": "dishes",
                "id": "11",
                "attributes": {
                    "name": "Penne ao Molho Pesto"
                }
            }
        ]);
    });
});

describe('Test client use case', () => {
    test('Client ordered', async () => {
        expect(await createOrder(dishOrder)).toStrictEqual({
            "data": [
                {
                    "type": "dishes",
                    "id": "1",
                    "attributes": {
                        "name": "Pizza"
                    }
                }
            ],
            "included": [
                {
                    "type": "ingredients",
                    "id": "40",
                    "attributes": {
                        "name": "queijo mussarela",
                        "quantity": 44//-1
                    }
                },
                {
                    "type": "ingredients",
                    "id": "3",
                    "attributes": {
                        "name": "molho de tomate",
                        "quantity": 94//-1
                    }
                },
                {
                    "type": "ingredients",
                    "id": "41",
                    "attributes": {
                        "name": "manjericão",
                        "quantity": 49//-2
                    }
                },
                {
                    "type": "ingredients",
                    "id": "33",
                    "attributes": {
                        "name": "cebola roxa",
                        "quantity": 54//-1
                    }
                },
                {
                    "type": "ingredients",
                    "id": "42",
                    "attributes": {
                        "name": "molho de maionese",
                        "quantity": 24//-1
                    }
                },
                {
                    "type": "ingredients",
                    "id": "39",
                    "attributes": {
                        "name": "massa de pizza",
                        "quantity": 14//-1
                    }
                },
                {
                    "type": "ingredients",
                    "id": "7",
                    "attributes": {
                        "name": "sal",
                        "quantity": 94//-1
                    }
                },
                {
                    "type": "ingredients",
                    "id": "8",
                    "attributes": {
                        "name": "pimenta",
                        "quantity": 94//-1
                    }
                }
            ]
        });
    });
});