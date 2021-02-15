import jwt from "jsonwebtoken";
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
      error.statusCode = 401;
      next(error);
    }
  }
  if (!token) {
    const error = new Error("Not authorized, no token");
    error.statusCode = 401;
    next(error);
  }
});

const checkadmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    const error = new Error("Not authorized, you aren't an administrator");
    error.statusCode = 401;
    next(error);
  }
};

export { checkauth, checkadmin };
