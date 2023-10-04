import connectDB from "../../connect-db";
import UserModel from "../../models/user";

export const getUsers = async () => {
  try {
    await connectDB();
    const User = await UserModel.find({});
    return User;
  } catch (error) {
    console.log(error);
  }
};
