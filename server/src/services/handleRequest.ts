const Signup = require("../routes/signup");
const Dashboard = require("../routes/dahsboard");

import { Application } from 'express';

const handleRequest = (app: Application) => {
  app.use('/api', Signup)
  app.use('/api', Dashboard)
  // app.use('/api', Login)
}

module.exports = handleRequest;