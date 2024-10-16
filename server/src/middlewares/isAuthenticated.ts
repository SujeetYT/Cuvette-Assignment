import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const jwt = require('jsonwebtoken');
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token = req.headers['authorization']
  token = token?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized Access',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized Access',
      });
    }
    req.user = decoded;
    next();
  });
};


module.exports = isAuthenticated;