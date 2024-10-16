import Signup from "../routes/signup";
import Dashboard from "../routes/dahsboard";

import { Application } from 'express';

export const handleRequest = (app: Application) => {
  app.use('/api', Signup)
  app.use('/api', Dashboard)
  // app.use('/api', Login)
}
