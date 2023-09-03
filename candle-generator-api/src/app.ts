import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";
import { candleRouter } from "./routes/candles";

// Creates an Express.js server:
export const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/candles', candleRouter);