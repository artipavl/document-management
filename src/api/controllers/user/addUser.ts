import createRandomPassword from "@/helpers/createRandomPassword";
import connectDB from "../../connect-db";
import UserModel from "@/api/models/user";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

export const addUser = async ({
  name,
  email,
  surname,
  phone,
  lastName,
  jobPosition,
  department,
  birthday,
}: IAddUser) => {
  const data: IAddUser = {
    name,
    email,
    surname,
    ...(phone ? { phone } : {}),
    ...(lastName ? { lastName } : {}),
    ...(jobPosition ? { jobPosition } : {}),
    ...(department ? { department } : {}),
    ...(birthday ? { birthday } : {}),
  };
  try {
    console.log(data);
    await connectDB();
    const password = createRandomPassword(12);
    console.log("password= " + password);

    const verificationCode = v4();
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await UserModel.create({
      ...data,
      verificationCode,
      password: hashPassword,
    });
  } catch (error) {
    console.log(error);
  }
};
