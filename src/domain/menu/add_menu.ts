import { Request, Response } from "express";
import menuJson from "../../infra/menu.json"

export function addMenu(req: Request, res: Response) {
    console.log(req.params, req.query, req.body);
    req.body.pratos.forEach((recipes_list: { name: string, ingredientes: { name: string, quantity: number }[] }) => {
        const recipeindex = menuJson.pratos.findIndex(recipe => recipe.name == recipes_list.name)
        if (recipeindex == -1) {
            console.log("This recipes not exist")
            menuJson.pratos.push(recipes_list)
        } else {
            console.log("Value already exist")
        }
    });
    res.json(menuJson)
}