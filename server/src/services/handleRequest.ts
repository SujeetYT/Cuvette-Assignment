import Signup from "../routes/signup";
import Dashboard from "../routes/dahsboard";
import Login from "../routes/login";
import OtpVerification from "../routes/otpVerification";

import { Application } from 'express';

export const handleRequest = (app: Application) => {
  app.use('/api', Signup)
  app.use('/api', Login)
  app.use('/api', OtpVerification)
  app.use('/api', Dashboard)
}
