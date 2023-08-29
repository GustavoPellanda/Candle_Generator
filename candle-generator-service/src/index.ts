import { config } from 'dotenv';
import axios from 'axios';
import Period from './enums/Period';
import Candle from './models/Candle';
import { CreateMessageChanel } from './messages/messageChannel';

config();

// Fetches and returns the API answer for the path defined in the .env file
const readMarketPrice = async (): Promise<number> => {
    const result = await axios.get(process.env.PRICES_API);
    const data = result.data;
    const price = data.bitcoin.usd;
    console.log("Curent Bitcoin value is: USD", price);
    return price;
}

// Creates a candle periodically:
const generateCandles = async() => {
    const messageChannel = await CreateMessageChanel();                                     // Function that connects to RabbitMQ

    if(messageChannel){
        while(true){
            const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS;                     // Sets the duration time of a candle
            const candle = new Candle('BTC', new Date());                                   // Constructs a candle

            console.log("Generating a new candle...");

            for(let i = 0; i < loopTimes; i++){
                const price = await readMarketPrice();                                      // Gets the API values
                candle.addValue(price);                                                     // Sends the values to the method that manages them
                await new Promise(r => setTimeout(r, Period.TEN_SECONDS));                  // Delays the time between each API fetch
            }
        
            candle.closeCandle();
            console.log("Candle finished.");
            
            const candleObj = candle.toSimpleObject();
            console.log(candleObj);                                                         // Logs the resulting candle object created with the Candle class
            const candleJson = JSON.stringify(candleObj);                                   // Transforms the object to JSON format
            messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson));    // Sends the candle to the RabbitMQ queue
            console.log('Candle sent to queue.');
        }
    }
}

generateCandles();