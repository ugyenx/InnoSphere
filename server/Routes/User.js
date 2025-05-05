import express from "express";
import { userModel, ContentModel, CourseModel } from "../db.js";
import { userValidator, userSigninValidator } from "../validator.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { jwt_user, salt_rounds } from "../config.js";
import bcrypt from "bcrypt";

export const userRoutes = express.Router();

userRoutes.post("/signup", async function (req, res) {
  const userData = req.body;
  console.log(userData);
  const verifiedData = userValidator.safeParse(userData);
  if (!verifiedData.success) {
    return res.status(400).json({
      msg: verifiedData.error.issues,
    });
  }
  try {
    const userAlreadyExists = await userModel.findOne({
      email: userData.email,
    });
    if (userAlreadyExists) {
      if (userAlreadyExists.userame == userData.userame) {
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

    const createNewUser = await userModel.create({
      userame: userData.userame,
      password: hashedPassword,
      email: userData.email,
      profile: userData.profile,
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
  const verifiedData = userSigninValidator.safeParse(userData);
  if (!verifiedData.success) {
    return res.status(400).json({
      msg: verifiedData.error,
    });
  }
  try {
    const userExists = await userModel.findOne({
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
        jwt_user,
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
