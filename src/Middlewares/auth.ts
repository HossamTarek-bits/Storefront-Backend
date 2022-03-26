import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth: string | undefined = req.headers.authorization;
    const token: string = auth ? auth.split(" ")[1] : "";

    jsonwebtoken.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    next(err);
  }
};
export default auth;
