import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import panierRoutes from "./routes/panier.js";
import recipeRoutes from "./routes/recipe.js";
import userRoutes from "./routes/user.js";
import subscriptionRoutes from "./routes/subscription.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/images", express.static("./images"));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Routes
app.use("/api/panier", panierRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/subscription", subscriptionRoutes);

//Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
