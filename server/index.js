import express from "express";
import mongoose from "mongoose";
import { productRoutes } from "./Routes/Products.js";
import { userRoutes } from "./Routes/User.js";
import cors from "cors"
const app = express();

mongoose.connect(
  "mongodb+srv://ugyen:SwIpq1dzH7jDbMup@cluster0.hy2ous4.mongodb.net/"
);
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"));

app.use("/", productRoutes);
app.use("/user",userRoutes)
app.listen(3000, () => {
  console.log("listening....");
});
