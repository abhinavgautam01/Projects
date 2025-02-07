import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from "cors"
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';


// Load environment variables
dotenv.config();

// Instantiate Express app
const app: Express = express();

//Parse.rquest.body
app.use(bodyParser.json())

//Use cors
app.use(cors())

// Create Database Connection for MongoDB
export const AppDataSource = new DataSource({
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: Number(process.env.MONGO_PORT),
    database: process.env.MONGO_DB,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [Task],
    synchronize: true,
});

// Define server port
const port = process.env.PORT || 3200;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript + MongoDB Server');
});

// Initialize Database Connection
AppDataSource.initialize()
    .then(async () => {
        console.log('MongoDB connection established successfully!');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error During Data Source Initialization:', err);
    });
