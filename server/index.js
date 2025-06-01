import express from "express";
import mongoose from "mongoose";
import { productRoutes } from "./Routes/Products.js";
import { userRoutes } from "./Routes/User.js";
import cors from "cors";
import { paymentRoutes } from "./Routes/payments.js";
import cookieParser from "cookie-parser";
const app = express();

mongoose.connect(
  "mongodb+srv://upadhyagovinda01:K0egzI9gHC3Zh3Vw@cluster0.s0p1pnn.mongodb.net/"
);
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true, // allows cookies and credentials
  })
);

app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/user", userRoutes);
app.use("/", productRoutes);

app.use("/payments", paymentRoutes);
app.listen(3000, () => {
  console.log("listening....");
});
