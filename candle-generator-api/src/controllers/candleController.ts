import { Candle, candleModel } from "../models/candleModel";

export default class candleController {
    async save(candle: Candle): Promise<Candle> {                  // Saves a new candle document in the database
        const newCandle = await candleModel.create(candle);
        return newCandle;
    }

    async findLastCandles(quantity: number): Promise<Candle[]>{
        const n = quantity > 0 ? quantity : 10;                   // If no quantity is defined, sets it to the last 10 candles
        const lastCandles: Candle[] = await candleModel
            .find()                                               // Retrives the database candle documents
            .sort({_id: -1})                                      // Sorts them by the IDs in reverse order
            .limit(n);                                            // Sets how many documents will be retrived
        
        return lastCandles;
    }

}