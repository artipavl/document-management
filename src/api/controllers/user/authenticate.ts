"use server";

import jwt, { JwtPayload } from "jsonwebtoken";

import connectDB from "../../connect-db";
import UserModel from "../../models/user";

export const authenticate = async (token: string) => {
  try {
    // console.log(authorization);
    // const [bearer, token] = authorization.split(" ");

    // if (bearer !== "Bearer") {
    //   return false;
    // }
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!SECRET_KEY) {
      return false;
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    if (typeof decoded === "string") {
      return false;
    }

    const _id: string = decoded._id;

    if (!_id) {
      return false;
    }

    await connectDB();

    const user = await UserModel.findOne({ _id });
    if (!user) {
      return false;
    }

    const payload: IUserPayload = {
      _id: user._id.toString(),
    };

    const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await UserModel.findByIdAndUpdate(user._id, { newToken });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: newToken,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};
