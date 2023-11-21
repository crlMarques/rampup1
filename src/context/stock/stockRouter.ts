import { Router, Request, Response } from 'express';
import { stockController } from './stockController';

const stockRouter = Router();

stockRouter.put('/stock', (req: Request, res: Response) => {
    stockController(req, res);
})

export default stockRouter