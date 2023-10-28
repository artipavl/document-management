import connectDB from "../../connect-db";
import UserModel from "../../models/user";

export const getUsers = async () => {
  try {
    await connectDB();
    const users = await UserModel.find(
      {},
      "name surname age email phone departmen"
    );

    const usersAsString: IUser[] = users.map((user) => {
      return {
        ...user.toJSON(),
        _id: user._id.toString(),
        ...(user.department
          ? { department: user.department.toString() }
          : { department: undefined }),
      };
    });

    return usersAsString;
  } catch (error) {
    console.log(error);
  }
};
