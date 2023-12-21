"use server";
import UserModel from "@/api/models/user";
import connectDB from "../../connect-db";

export const updateUserById = async (
  data: IAddUser,
  id: string
) => {
  try {
    await connectDB();
    await UserModel.findByIdAndUpdate(id, data);
  } catch (error) {
    console.log(error);
  }
};
