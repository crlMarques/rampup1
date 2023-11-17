import { Router, Request, Response } from 'express';
import { getMenu } from "../../domain/menu/dish_menu"
import { removeMenu } from '../../domain/menu/remove_menu';
import { addMenu } from '../../domain/menu/add_menu';

const menuRouter = Router();

menuRouter.get('/menu', (req: Request, res: Response) => {
    getMenu(req, res);
})

menuRouter.delete('/menu', (req: Request, res: Response) => {
    removeMenu(req, res);
})

menuRouter.post('/menu', (req: Request, res: Response) => {
    addMenu(req, res);
})

export default menuRouter