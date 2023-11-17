import { Request, Response } from "express";
import data from "../../infra/menu.json"

export function getMenu(req: Request, res: Response) {

    console.log(req.params, req.query, req.body);
    if (req.query == null) {
        res.send("Request Empty")

    } else if (req.query.prato == 'all') {
        res.json(data)
        console.log("passou");
    }
}