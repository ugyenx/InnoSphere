import express from "express";
import mongoose from "mongoose";
import { productRoutes } from "./Routes/Products.js";
const app = express();

mongoose.connect(
  "mongodb+srv://upadhyagovinda01:tif13NKsl4WLqXAZ@cluster0.wsr25tc.mongodb.net/"
);
app.use("/", productRoutes);
app.listen(3000, () => {
  console.log("listening....");
});
