import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const jwt = require('jsonwebtoken');
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export function isAuthenticated(req: AuthenticatedRequest, res: Response, next: NextFunction):any{
  
  let token:string | undefined | null = req.headers['authorization']
  
  if (token === "" || token === undefined || token === null || token === "null" || token === "undefined") {
    return res.status(401).json({
      message: 'Token is required',
    });
  }

  token = token?.split(' ')[1];
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  if(!decoded){
    return res.status(401).json({
      message: 'Unauthorized Access',
    });
  }

  if (decoded.iat >= decoded.exp) {
    return res.status(401).json({
      message: 'Token expired',
    });
  }

  req.user = decoded;
  next();
};

