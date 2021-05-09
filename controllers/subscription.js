import AsyncHandler from "express-async-handler";

import Subscription from "../models/Subscription.js";
import axios from "axios";
import FormData from "form-data";

const getSubscription = AsyncHandler(async (req, res, next) => {
  const email = req.user.email;
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
  const quantity = req.body.quantity || 1;
  const amount = req.body.amount;
  const recipient = req.body.recipient;
  const payment_method = req.body.payment_method || auto;

  // Price verification
  const base_amount = amount / quantity;
  console.log(base_amount); // Créer un modèle des prix
  if ([1, 5, 22, 80].includes(base_amount)) {
    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("currency", "EUR");
      formData.append("type", "phone");
      formData.append("recipient", recipient);
      formData.append("vendor_token", process.env.VENDOR_TOKEN);
      formData.append("payment_method", payment_method);
      const headers = {
        ...formData.getHeaders(),
        "Content-Length": formData.getLengthSync(),
      };
      const resdata = await axios.post(
        "https://homologation.lydia-app.com/api/request/do.json",
        formData,
        { headers }
      );
      console.log(resdata.data);
      res.status(201).json({
        message: "Need your payment",
        url: resdata.data.mobile_url,
        request_uuid: resdata.data.request_uuid,
      });
    } catch (err) {
      console.log(err);
      res.status(404);
      throw new Error("Can't do the request");
    }
  } else {
    res.status(404);
    throw new Error("Not the right amount");
  }
});
const ValidationSubscription = AsyncHandler(async (req, res, next) => {
  const request_uuid = req.body.request_uuid;

  const formData = new FormData();

  formData.append("request_uuid", request_uuid);
  formData.append("vendor_token", process.env.VENDOR_TOKEN);

  const headers = {
    ...formData.getHeaders(),
    "Content-Length": formData.getLengthSync(),
  };
  const resdata = await axios.post(
    "https://homologation.lydia-app.com/api/request/state",
    formData,
    { headers }
  );
  if (resdata.data.state === "1") {
    next();
  } else if (resdata.data.state == "0") {
    console.log(resdata.data.state);
    res.status(401);
    throw new Error("Waiting to be accepted");
  } else if (resdata.data.state === "5") {
    res.status(401);
    throw new Error("Refused by the payer");
  } else if (resdata.data.state === "6") {
    res.status(401);
    throw new Error("Cancelled by the owner");
  } else {
    throw new Error("invalid request...");
  }
});

const addSubstoDatabase = AsyncHandler(async (req, res, next) => {
  const UserId = req.user.email;
  const typeSubscription = req.body.typeSubscription; // 1 week, 1 month, 4 months
  const request_uuid = req.body.request_uuid;
  const quantity = req.body.quantity || undefined;
  const expired = req.body.expired || undefined;
  const collect = req.body.collect || undefined;

  try {
    const subscription = new Subscription({
      email: UserId,
      quantity: quantity,
      typeSubscription: typeSubscription,
      expired: expired,
      collect: collect,
      request_uuid: request_uuid,
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
  const expired = req.body.expired || false;
  const sort = req.body.sort || -1;

  try {
    const subscriptionUsers = await Subscription.find({
      expired: expired,
    }).sort({ EndSubscription: sort });
    console.log(subscriptionUsers);
    res.json({
      message: "Fetched Subscriptions successfully.",
      subscriptions: subscriptionUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(404);
    throw new Error("Nobody subscribe yet...");
  }
});

const updateSubscription = AsyncHandler(async (req, res, next) => {
  try {
    const subsId = req.params.subsId;
    const quantity = req.body.quantity;
    const collect = req.body.collect;
    const EndSubscription = req.body.EndSubscription;
    const collectdate = req.body.collectdate;
    const subscriptionUser = await Subscription.findById(subsId);
    subscriptionUser.quantity = quantity;
    subscriptionUser.collect = collect;
    subscriptionUser.EndSubscription = EndSubscription;
    subscriptionUser.collectdate = collectdate;

    await subscriptionUser.save();
    res.status(201).json({
      message: "Subscription updated successfully!",
      subscription: subscriptionUser,
    });
  } catch (error) {
    console.error(error);
    res.status(404);
    throw new Error("Can't find this subscription. Please enter a correct id");
  }
});
export {
  getSubscription,
  AddSubscription,
  ValidationSubscription,
  addSubstoDatabase,
  getSubscriptions,
  updateSubscription,
};
