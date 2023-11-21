import { Router, Request, Response } from 'express';
import { dellMenuController } from "./menuDellController"
import { addMenuController } from "./menuAddController"
import { getMenuController } from "./menuGetController"

const menuRouter = Router();

menuRouter.get('/menu', (req: Request, res: Response) => {
    getMenuController(req, res);
})

menuRouter.delete('/menu', (req: Request, res: Response) => {
    dellMenuController(req, res);
})

menuRouter.post('/menu', (req: Request, res: Response) => {
    addMenuController(req, res);
})

export default menuRouter