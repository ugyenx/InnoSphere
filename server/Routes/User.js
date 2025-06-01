import express from "express";
import { UserModel } from "../db.js";
import { userValidator, userSigninValidator } from "../validator.js";
import { z } from "zod";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

export const userRoutes = express.Router();

userRoutes.post("/signup", async function (req, res) {
  const userData = req.body;
  console.log(userData);

  try {
    const userAlreadyExists = await UserModel.findOne({
      email: userData.email,
    });
    if (userAlreadyExists) {
      if (userAlreadyExists.username == userData.username) {
        return res.status(409).json({
          msg: "user already exists. Please login or use different username.",
        });
      }
      return res.status(409).json({
        msg: "user already exists. Please login or use different email.",
      });
    }

    let salt = await bcrypt.genSalt(5);
    let hashedPassword = await bcrypt.hash(userData.password, salt);

    const createNewUser = await UserModel.create({
      username: userData.name,
      password: hashedPassword,
      email: userData.email,
    });

    res.status(200).json({
      msg: "user signed up successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
});
userRoutes.post("/signin", async function (req, res) {
  const userData = req.body;
  console.log(userData);
  try {
    const userExists = await UserModel.findOne({
      email: userData.email,
    });
    if (!userExists) {
      return res.status(404).json({
        msg: "user doesnt exist please sign up first",
      });
    }
    let hash = bcrypt.compare(userData.password, userExists.password);
    if (hash) {
      let token = jwt.sign(
        {
          id: userExists._id.toString(),
        },
        "user",
        {
          expiresIn: "12h",
        }
      );
      res.cookie(`token`, token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      res.status(200).json({
        msg: "signed in successfully",
        token: token,
      });
    } else {
      res.status(400).json({
        message: "wrong password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});
userRoutes.post("/admin/signin", async function (req, res) {
  const userData = req.body;
  console.log(userData);
  try {
    const userExists = await UserModel.findOne({
      email: userData.email,
    });
    if (!userExists) {
      return res.status(404).json({
        msg: "admin doesnt exist please sign up first",
      });
    }
    let hash = bcrypt.compare(userData.password, userExists.password);
    if (hash) {
      let token = jwt.sign(
        {
          id: userExists._id.toString(),
        },
        "admin",
        {
          expiresIn: "12h",
        }
      );
      res.cookie(`token`, token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      res.status(200).json({
        msg: "signed in successfully",
        token: token,
      });
    } else {
      res.status(400).json({
        message: "wrong password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});
