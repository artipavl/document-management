import createRandomPassword from "@/helpers/createRandomPassword";
import connectDB from "../../connect-db";
import UserModel from "@/api/models/user";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

export const addUser = async ({
  name,
  email,
  surname,
  age,
  phone,
  lastName,
  jobPosition,
  department,
}: IAddUser) => {
  const data: IAddUser = {
    name,
    email,
    surname,
    age,
    ...(phone ? { phone } : {}),
    ...(lastName ? { lastName } : {}),
    ...(jobPosition ? { jobPosition } : {}),
    ...(department ? { department } : {}),
  };
  try {
    console.log(data);
    await connectDB();
    const password = createRandomPassword(12);
    console.log("password= " + password);

    const verificationCode = v4();
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = await UserModel.create({
      ...data,
      verificationCode,
      password: hashPassword,
    });
    console.log("user");
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
