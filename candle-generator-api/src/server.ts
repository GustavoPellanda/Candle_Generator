import { config } from "dotenv";
import { app } from "./app";
import { connectToMongoDB } from "./config/db";
import { connection } from "mongoose";
import messageChannel from "./messages/messageChannel";

const createServer = async () => {
    config();
    await connectToMongoDB();                                                               // Connects to the database before the server starts running
    
    const PORT = process.env.PORT;                                                          // Defines the port where the server will be running on:
    const server = app.listen(PORT, () => console.log(`App running on port ${PORT}...`));

    const candleMessageChannel = new messageChannel(server);
    candleMessageChannel.consumeMessages();                                                 // Triggers the method that manages the messages

    process.on('SIGINT', async () => {                                                      // Terminates the server if the OS is interrupted
        await connection.close();
        server.close();
        console.log("Server terminated. Connection to MongoDB closed.");
    });
}

createServer();