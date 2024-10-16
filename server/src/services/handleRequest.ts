const Signup = require("../routes/signup.ts");
const Dashboard = require("../routes/dahsboard.ts");

import { Application } from 'express';

const handleRequest = (app: Application) => {
  app.use('/api', Signup)
  app.use('/api', Dashboard)
  // app.use('/api', Login)
}

module.exports = handleRequest;