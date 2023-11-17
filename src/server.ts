import express from 'express'
import clientRouter from './context/client/clientRouter'
import menuRouter from './context/menu/menuRoute'
import stockRouter from './context/stock/stockRouter'
import sequelize from "./db/config"

const app = express();

app.use(express.json());
app.use(clientRouter,menuRouter,stockRouter);

app.listen(3000, async () => {
    console.log('server running on port 3000')
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
})