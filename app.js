import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import panierRoutes from "./routes/panier.js";
import recipeRoutes from "./routes/recipe.js";
import userRoutes from "./routes/user.js";
import subscriptionRoutes from "./routes/subscription.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/images", express.static("./images"));

// Routes

app.use("/api/panier", panierRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/subscription", subscriptionRoutes);

// Error handling
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
