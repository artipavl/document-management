"use server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "../../connect-db";
import UserModel from "../../models/user";
import { authenticate } from "./authenticate";

export const loginUser = async ({ email, password }: ILoginUser) => {
  try {
    await connectDB();
    const user = await UserModel.findOne(
      { email }
      //   "_id name surname age email phone departmen password"
    );
    if (!user) {
      return false;
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return false;
    }
    const payload: IUserPayload = {
      _id: user._id.toString(),
    };

    const SECRET_KEY = process.env.SECRET_KEY;

    if (!SECRET_KEY) {
      return false;
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await UserModel.findByIdAndUpdate(user._id, { token });

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      token,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};
