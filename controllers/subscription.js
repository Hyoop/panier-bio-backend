import AsyncHandler from "express-async-handler";

import Subscription from "../models/Subscription.js";

const getSubscription = AsyncHandler(async (req, res, next) => {
  const email = req.body.email || req.user.email;
  try {
    const subscriptionUser = await Subscription.find({
      email: email,
      expired: false,
    });
    res.json({
      message: "Fetched Subscription successfully.",
      subscription: subscriptionUser,
    });
  } catch (error) {
    console.error(error);
    res.status(404);
    throw new Error("No subscription, Please subscribe to our services.");
  }
});

const AddSubscription = AsyncHandler(async (req, res, next) => {
  const UserId = req.user.email;
  const typeSubscription = req.body.typeSubscription; // 1 week, 1 month, 4 months

  const NbBaskets = req.body.NbBaskets || undefined;
  const expired = req.body.expired || undefined;
  const collect = req.body.collect || undefined;

  try {
    const subscription = new Subscription({
      email: UserId,
      NbBaskets: NbBaskets,
      typeSubscription: typeSubscription,
      expired: expired,
      collect: collect,
    });
    await subscription.save();
    res.status(201).json({
      message: "Subscription added successfully!",
      subscription: subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(404);
    throw new Error("Suscription failed, please contact our support");
  }
});

const getSubscriptions = AsyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw errors;
    }
    try {
      const subscriptionUsers = await Subscription.find({
        expired: false,
      });

      res.json({
        message: "Fetched Subscriptions successfully.",
        subscriptions: subscriptionUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(404);
      throw new Error("Nobody subscribe yet...");
    }
  }
});

const updateSubscription = AsyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw errors;
    }
    try {
      const subsId = req.params.subsId;
      const takeBasket = req.body.value || 0;
      const collect = req.body.collect || req.body.value >= 1 ? true : false;
      const subscriptionUsers = await Subscription.findById(subsId);
      subscriptionUsers.NbBaskets = subscriptionUsers.NbBaskets - takeBasket;
      subscriptionUsers.collect = collect;
      await subscriptionUsers.save();
      res.status(201).json({
        message: "Subscription updated successfully!",
        subscription: subscriptionUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(404);
      throw new Error(
        "Can't find this subscription. Please enter a correct id"
      );
    }
  }
});
export {
  getSubscription,
  AddSubscription,
  getSubscriptions,
  updateSubscription,
};
