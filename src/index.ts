import { config } from 'dotenv';
import axios from 'axios';

config();

// Fetches the API answer for the path defined in the .env file
const readMarketPrice = async (): Promise<number> => {
    const result = await axios.get(process.env.PRICES_API);
    const data = result.data;
    const price = data.bitcoin.usd;
    console.log("Curent Bitcoin value is: USD", price);
    return price;
}

//Test

readMarketPrice();