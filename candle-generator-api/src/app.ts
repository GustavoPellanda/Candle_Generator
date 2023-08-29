import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";

// Creates an Express.js server:
export const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'));