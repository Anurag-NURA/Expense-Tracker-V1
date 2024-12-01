import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

//this method will protect the routes that require authentication before accessing them
const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies?.jwt;
    //jwt is stored in the cookie with the name 'jwt'

    if (token) {
      try {
        const secret = process.env.JWT_SECRET;

        if (!secretKey) {
          throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const decoded = jwt.verify(token, secret);
        //token is decoded by passing token and the secret key as arguments in the jwt.verify function

        req.user = await User.findById(decoded.userId).select("-password");
        //request can be made from any route
        //userId because when we generated the token, we passed the userId as the payload
        //'-password' means we don't want to return the password included in the decoded object

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        if (error.name === "TokenExpiredError") {
          throw new Error("Token expired, please login again");
        } else {
          throw new Error("Not authorized, Invalid Token");
        }
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } catch (error) {
    next(error);
  }
};

export { protect };
