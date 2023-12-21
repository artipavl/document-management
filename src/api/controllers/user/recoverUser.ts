"use server";
import createRandomPassword from "@/helpers/createRandomPassword";
import connectDB from "../../connect-db";
import UserModel from "@/api/models/user";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

export const recoverUser = async ({ name, email }: IRecoverUser) => {
  try {
    await connectDB();
    const user = await UserModel.findOne(
      { email, name }
      //   "_id name surname age email phone departmen password"
    );
    if (!user) {
      return false;
    }
    const password = createRandomPassword(12);
    console.log("password= " + password);

    const verificationCode = v4();
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await UserModel.findByIdAndUpdate(user._id, {
      token: "",
      password: hashPassword,
      verificationCode,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
