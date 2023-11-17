import { Router, Request, Response } from 'express';
import { orderController } from './clientController';

const clientRouter = Router();

clientRouter.post('/order', (req: Request, res: Response) => {
    orderController(req, res);
})

export default clientRouter