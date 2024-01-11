"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

import connectDB from "../../connect-db";
import UserModel from "@/api/models/user";
import deleteCookies from "@/helpers/deleteCookies";

export const logoutUser = async () => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!SECRET_KEY) {
      return false;
    }
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return false;
    }

    const decoded = jwt.verify(token.value, SECRET_KEY);

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

    await UserModel.findByIdAndUpdate(user._id, { token: "" });

    deleteCookies();
    return {};
  } catch (error) {
    console.log(error);
    return false;
  }
};
