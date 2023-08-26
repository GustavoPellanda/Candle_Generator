import CandleColor from "../enums/CandleColor"

// Defines the attributes of a candle:
export default class Candle {
    
    // A candle is built based on it's opening, highest, lowest and closing prices during a time interval
    low: number
    high: number
    open: number
    close: number
    color: CandleColor
    finalDateTime: Date
    values: number[]
    currency: string

    constructor(currency: string, initalDateTime: Date){
        this.currency = currency;
        this.low = Infinity;
        this.high = 0;
        this.close = 0;
        this.open = 0;
        this.values = [];
        this.color = CandleColor.UNDETERMINED;
    }
    
    // Recives a new value to update the candle's information:
    addValue(value: number) {
        this.values.push(value);

        // Defines the opening value of the candle:
        if (this.values.length == 1) {
            this.open = value;
        }

        // Updates the lowest and highest prices recived:
        if (this.low > value) {
            this.low = value;
        }
        if (this.high < value) {
            this.high = value;
        }
    }

    // Closes the candle:
    closeCandle() {
        // Sets the closing price and time of a candle:
        if (this.values.length > 0) {
            this.close = this.values[this.values.length - 1]
            this.finalDateTime = new Date();
            
            // Defines whether the candle is red or green based on opening vs closing prices:
            if (this.open > this.close) {
                this.color = CandleColor.RED;
            } else if (this.close > this.open) {
                this.color = CandleColor.GREEN;
            }
        }
    }

    // Returns the candle object, except por the intermediate values compared in the process of building it:
    toSimpleObject() {
        const { values, ...obj } = this;
        return obj;
    }

}