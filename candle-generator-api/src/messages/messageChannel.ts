import { Channel, connect } from "amqplib"
import { config } from "dotenv";
import { Server } from "socket.io";
import * as http from 'http';
import candleController from "../controllers/candleController";
import { Candle } from "../models/candleModel";

config();

// Connects to the candle generator service through RabbitMQ, saves the candles recived in the MongoDB database and emmits them to the front end through web sockets:
export default class messageChannel {
    private _channel: Channel;
    private _candleController: candleController;
    private _io: Server;

    constructor(server: http.Server){                                      // Uses a http server to initialize instances of websockets
        this._candleController = new candleController();
        this._io = new Server(server, {
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,                  // This is the port through which the the clients will be allowed to connect
                methods: ["GET", "POST"]
            }
        });
        this._io.on('connection', () => 
            console.log('Web socket connection created.')
        );
    }

    private async _createMessageChannel(){                                 // Will be triggered at the beggining of the consume messages method
        try{
            const connection = await connect(process.env.AMQP_SERVER);     // Establishes the connection with RabbitMQ server
            this._channel = await connection.createChannel();
            this._channel.assertQueue(process.env.QUEUE_NAME);
        } catch(err) {
            console.log('Connection to RabbitMQ failed.');
            console.log(err);
        }
    }

    async consumeMessages(){
        await this._createMessageChannel();
        if(this._channel){                                                     // Ensures the RabbitMQ connection will only be created once the socket server already exists
            this._channel.consume(process.env.QUEUE_NAME, async msg => {
                const candleObj = JSON.parse(msg.content.toString());          // Converts the recived JSON candle object to a string
                console.log('New message received!\n\n', candleObj);
                this._channel.ack(msg);                                        // Acknowledges the message was recived back to RabbitMQ

                const candle: Candle = candleObj;                              // Relates the string to the MongoDB Candle model
                await this._candleController.save(candle);                     // Saves the candle on the database
                console.log('New candle saved to database.');                  // Notice: attribute names from the RMQ and MDB candle objects are matching
                this._io.emit(process.env.SOCKET_EVENT_NAME, candle);          // Sends the candle to the websocket
                console.log('Candle emitted via web socket.');

            });

            console.log('Candle consumer started. Awaiting for candles...');
        }
    }
}