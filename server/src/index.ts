import dotenv from 'dotenv';
import express from 'express';
const DatabaseConnection = require("./config/DatabaseConnection");
const handleRequests = require("./services/handleRequest");
const cookieParser = require('cookie-parser');
const cors = require('cors');

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


handleRequests(app);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
