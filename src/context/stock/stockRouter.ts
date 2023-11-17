import { Router, Request, Response } from 'express';
import { increaseStock } from '../../domain/stock/increase_stock';

const stockRouter = Router();

stockRouter.put('/stock', (req: Request, res: Response) => {
    increaseStock(req, res);
})


export default stockRouter