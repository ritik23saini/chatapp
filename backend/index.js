import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
 import router from './routes/routes.js';
 import connectDb from './db/db.js';

dotenv.config({});

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/v1/users', router);
 
app.listen(PORT, () => console.log('> Server is up and running on port : ' +PORT));
