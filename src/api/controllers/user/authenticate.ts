"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

import connectDB from "../../connect-db";
import UserModel from "../../models/user";
import deleteCookies from "@/helpers/deleteCookies";

export const authenticate = async () => {
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

    const token = cookies().get("token");

    if (!token?.value) {
      deleteCookies();
      return false;
    }

    const decoded = jwt.verify(token.value, SECRET_KEY);

    if (typeof decoded === "string") {
      deleteCookies();
      return false;
    }

    const _id: string = decoded._id;

    if (!_id) {
      deleteCookies();
      return false;
    }

    await connectDB();

    const user = await UserModel.findOne({ _id });
    if (!user) {
      deleteCookies();
      return false;
    }

    const payload: IUserPayload = {
      _id: user._id.toString(),
    };

    const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await UserModel.findByIdAndUpdate(user._id, { token: newToken });

    cookies().set("token", newToken);
    cookies().set("name", user.name);
    cookies().set("_id", user._id.toString());
    cookies().set("email", user.email);

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      token: newToken,
    };
  } catch (error) {
    console.log(error);
    deleteCookies();
    return false;
  }
};
