import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/types";

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  // ✅ Remove "Bearer "
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
// console.log("HEADER TOKEN",req.headers.authorization)
  try {
    const decoded = jwt.verify(token, "secretkey") as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};



export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};