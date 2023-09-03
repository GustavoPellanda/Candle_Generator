import { Router } from "express";
import candleController from "../controllers/candleController";

export const candleRouter = Router();
const candleCtrl = new candleController();

// Defines the route that will be accessed to make candle requests. 
// It takes how many candles are wanted as a parameter;
candleRouter.get('/:quantity', async (req, res) => {
    const quantity = parseInt(req.params.quantity);
    const candles = await candleCtrl.findLastCandles(quantity);
    return res.json(candles);
});