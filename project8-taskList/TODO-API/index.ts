import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from "cors"
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/task.router';

// Load environment variables
dotenv.config();

// Instantiate Express app
const app: Express = express();

//Parse.rquest.body
app.use(bodyParser.json())

//Use cors
app.use(cors())

// // Create Database Connection for MongoDB
// export const AppDataSource = new DataSource({
//     type: 'mongodb',
//     host: process.env.MONGO_HOST,
//     port: Number(process.env.MONGO_PORT),
//     database: process.env.MONGO_DB,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     entities: [Task],
//     synchronize: true,
// });

// // Define server port
// const port = process.env.PORT || 3200;

// // Initialize Database Connection
// AppDataSource.initialize()
//     .then(async () => {
//         console.log('MongoDB connection established successfully!');
//         app.listen(port, () => {
//             console.log(`Server is running on http://localhost:${port}`);
//         });
//     })
//     .catch((err) => {
//         console.error('Error During Data Source Initialization:', err);
//     });

// app.use('/', tasksRouter)

// Create Database Connection for MariaDB
export const AppDataSource = new DataSource({
    type: "mariadb", // Use "mariadb" instead of "mongodb"
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "todo_db",
    synchronize: true, // Set to false in production
    logging: true,
    entities: [Task], // Adjust entity path based on your structure
});

// Define server port
const port = process.env.PORT || 3200;

// Initialize Database Connection
AppDataSource.initialize()
    .then(async () => {
        console.log("MariaDB connection established successfully!");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error During Data Source Initialization:", err);
    });

// Use routes
app.use("/", tasksRouter);
