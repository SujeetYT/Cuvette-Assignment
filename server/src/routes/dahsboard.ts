import express from 'express';
const dahsboardRouter = express.Router();


// controllers
import interviewController from "../controller/interview.controller";

//middlewares
import {isAuthenticated} from "../middlewares/isAuthenticated";


// routes
dahsboardRouter.post('/dashboard/createInterview', isAuthenticated, interviewController.create)
dahsboardRouter.get('/dashboard/getInterviews', isAuthenticated, interviewController.get)


export default dahsboardRouter;
