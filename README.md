<h1 align="center"> Candle Generator </h1>

<p> Candle Generator is a software system designed to obtain data from a chosen financial API that informs prices for a given currency and exhibit it graphically in the form of a candle chart. </p>

<h2>Content</h2>
<ul>
    <li><a href="#Explanation">Explanation</a></li>
    <li><a href="#Technologies Used">Technologies Used</a></li>
    <li><a href="#Environment Set-Up">Environment Set-Up</a></li>
    <li><a href="#Main Codes">Main Codes</a></li>
    <li><a href="#Building and Running">Building and Running</a></li>
    <li><a href="#Working Examples">Working Examples</a></li>
</ul>

<h2>Explanation</h2>

<p>Candle Generator is a software system that consists of three apps: The Service, The API, and The Web App. Its main goal is to display the fluctuations of a currency in a financial candle chart. As of the current date (09/11/23), it is configured to monitor and display the fluctuations of Bitcoin, using the API available at CoinGecko.</p>

<p><img src="https://github.com/GustavoPellanda/Candle_Generator/assets/129123498/ea1a0b6b-fe3d-4bba-a9a1-7229d8b2df09" alt="schematic drawing representing the functioning of the system"></p>
    
<p>The Service is responsible for fetching data from the CoinGecko API, which includes Bitcoin prices over a specified time period. The address used to access CoinGecko is defined in the ".env" file, while the duration of each data fetch is determined by variables in "/enums/Period.ts." The Service then organizes this information into an object containing the necessary data for constructing a financial candle: opening, highest, lowest, and closing prices of Bitcoin during the specified time period. The code that tracks the highest and lowest prices is located in "/models/Candle.ts," which is also responsible for defining the structure of a candle object. Subsequently, each candle object created is sent to the RabbitMQ transmission queue. The RabbitMQ configuration is specified in the "docker-compose.yml" file, and the connection is managed by the code in "/messages/messageChannel.ts." The names of the queue and AMQP server are defined in the ".env" file.</p>

<p>The API is responsible for handling the streaming of candles from the Service to the Web and also for storing them in a database. It establishes a WebSocket channel through which clients can connect to and receive candle objects. The "/messages/messageChannel.ts" code is responsible for receiving the candle data transmitted via the RabbitMQ queue and routing it to both the MongoDB database and the socket.io channel. The Express server necessary for the API to run is started by "server.ts," which is also responsible for initializing the Message Channel. CRUD operations on the database are defined in "/controllers/candleController.ts," while the document model used for storage is defined in "/models/candleModel.ts," and the database connection is managed by "/config/db.ts."</p>

<p>The Web Application is responsible for creating a candlestick chart by fetching the candles provided by the API. The "App.vue" code makes an initial fetch of a predefined number of candles and then continuously listens for new candles to update the chart. The chart component itself is defined in "/components/CandleStickChart.vue," while "/store/modules/candleStore.ts" manages the data that is stored and provided to the chart.</p>

<h2>Technologies Used</h2>
<ul>
    <li>Typescript</li>
    <li>Node.js</li>
    <li>RabbitMQ</li>
    <li>AMQP</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>Socket.io</li>
    <li>Axios</li>
    <li>Docker</li>
    <li>Yarn</li>
    <li>Express.js</li>
    <li>PM2</li>
    <li>Vue3</li>
    <li>HTML & CSS</li>
    <li>ApexCharts.js</li>
</ul>

<h2>Environment Set-Up</h2>

<p>To run the development servers you'll need to have the RabbitMQ and MongoDB docker daemons running.</p>

<h2>Main Codes</h2>

<p>These are the codes that handle the basis of the operation of each app.</p>
<p>Generator: src/index.ts</p>
<p>API: src/server.ts and src/messages/messageChannel.ts</p>
<p>Web: src/App.vue</p>

<h2>Building and Running</h2>

<p>Candle Service can be run individually with the command yarn run.</p> 
<p>The API can be run individually with the command yarn dev.</p>
<p>The TypeScript codes from the Service and the API can be translated into JavaScript using tsc.</p>
<p>The backend codes can be daemonized and operated in the background using PM2.</p>
<p>The Web App can be run individually with the command npm run serve.</p>

<h2>Working Examples</h2>

<img src="https://github.com/GustavoPellanda/Candle_Generator/assets/129123498/2dfa55c8-1b4a-4696-a7ba-8668b35062a7" alt="screenshot of the programs working">
