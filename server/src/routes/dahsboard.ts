// const express = require('express');
const dahsboardRouter = require('express').Router();


// controllers
const interviewController = require("../controller/interview.controller");

//middlewares
const isAuthenticated = require("../middlewares/isAuthenticated");


// routes
dahsboardRouter.post('/dashboard/createInterview', isAuthenticated, interviewController.create)


module.exports = dahsboardRouter;
