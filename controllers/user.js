import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import Vegetable from "../models/Vegetable.js";
import Recipe from "../models/Recipe.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, isAdmin: true });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const GetInformation = asyncHandler(async (req, res) => {
  const expired = false;
  try {
    const Nbsubscriptions = await Subscription.count({ expired: expired });
    const NbVege = await Vegetable.count();
    const NbUsers = await User.count();
    const NbRecipes = await Recipe.count();

    res.json({
      message: "Fetched Subscriptions successfully.",
      Informations: {
        NumberSubscriptions: Nbsubscriptions,
        NumberVegetables: NbVege,
        NumberUsers: NbUsers,
        NumberRecipes: NbRecipes,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404);
    throw new Error("Can't count database");
  }
});

export { authUser, registerUser, authAdmin, GetInformation };
