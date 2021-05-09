import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import mongoose from "mongoose";

const checkauth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(
        mongoose.Types.ObjectId(decoded.id)
      ).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { checkauth };
