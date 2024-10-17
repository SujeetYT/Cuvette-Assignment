import express from "express";
const LoginRouter = express.Router();

// controllers
import LoginController from "../controller/login.controller";



// routes
LoginRouter.post('/login', LoginController.login)


export default LoginRouter;