// This is the mongoose model that defines the structure of the database.

import { model, Document, Schema } from "mongoose";


// Defines the properties of a Mongoose document (in this case, a single candle):
export interface Candle extends Document {
    currency: string;
    finalDateTime: Date;
    open: number;
    close: number;
    high: number;
    low: number;
    color: string;
}

// Defines a schema (the database structure):
const schema = new Schema<Candle>({
    currency: { type: String, required: true },
    finalDateTime: { type: Date, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    color: { type: String, required: true }
});

// Creates and exports the Mongoose model for the Candle collection:
export const candleModel = model<Candle>('Candle', schema);