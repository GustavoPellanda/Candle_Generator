import { config } from 'dotenv';
import { Channel, connect } from 'amqplib';

// Creates the channel that sends messages through RabbitMQ:
export const CreateMessageChanel = async (): Promise<Channel> => {
    config();

    try{
        const connection = await connect(process.env.AMQP_SERVER);  
        const channel = await connection.createChannel();               // Creates the RabbitMQ channel
        await channel.assertQueue(process.env.QUEUE_NAME);              // Creates a queue
        console.log('Connected to RabbitMQ');
        return channel;
    }  catch (err) {
        console.log('Error while trying to connect to RabbitMQ');
        console.log(err);
        return null;
    }
}