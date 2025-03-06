import { Response, NextFunction } from "express";
import User from "../models/users";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../models/interfaces";

export const checkAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Token invalid" });
    }

    const user = await User.findById((decoded as jwt.JwtPayload).userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware: " + error.message);
    res.status(500).json({ message: "Interval Server Error in Middleware" });
  }
};
