import axios from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import Candle from "@/models/candle";

// Fetches the API and manages the data recived

const http = axios.create({                                                                 // Creates a http client that connects to the candles api
    baseURL: process.env.VUE_APP_CANDLES_API
});

@Module({ name: 'CandleSore' })
export default class CandleStore extends VuexModule {
    private _candles: Candle[] = [];

    get candles(){                                                                          // Structures a candle as expected by the apex charts model
        return this._candles.length > 0 ? 
        this._candles.map(c => {
            return {
                x: c.finalDateTime.toLocaleTimeString(),
                y: [c.open, c.high, c.low, c.close]
            }
        }): []
    }

    @Action
    async loadInitalCandles(){
        const result = await http.get(`${process.env.VUE_APP_CANDLES_API_ENDPOINT}/10`);    // Fetches an array of the last 10 candles from the websocket
        const candlesObj = result.data;
        const candles: Candle[] = candlesObj.map((c: any) => new Candle(c));                // Creates a new instance of the Candle class for each candle in the array
        this.context.commit('_initializeCandles', candles.reverse());                       // Commits from oldest to newest
    }

    @Action
    addCandle(candle: Candle){
        this.context.commit('_appendNewCandle', candle);
    }

    @Mutation
    private _initializeCandles(candles: Candle[]){
        this._candles = candles;
    }

    @Mutation
    private _appendNewCandle(candle: Candle){
        this._candles.push(candle);
    }
}