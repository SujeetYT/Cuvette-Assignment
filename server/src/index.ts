import dotenv from 'dotenv';
import express from 'express';
import { DatabaseConnection } from './config/DatabaseConnection';
import { handleRequest } from './services/handleRequest';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// initialize configuration
dotenv.config();
DatabaseConnection();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


handleRequest(app);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
