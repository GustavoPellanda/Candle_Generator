export default class Candle {
    currency: string = ''
    finalDateTime: Date = new Date()
    open: number = 0
    close: number = 0
    high: number = 0
    low: number = 0
    color: string = ''

    constructor(candleObj: any) {
        Object.assign(this, candleObj);                     // Attribute names are the same as the JSON object that is expected
        this.finalDateTime = new Date(this.finalDateTime);  // Converts the finalDateTime string to datetime type
    }
}