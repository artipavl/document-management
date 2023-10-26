import AddresseeModel from "@/api/models/addressee";
import connectDB from "../../connect-db";

export const addAddressee = async ({
  name,
  email,
  phone,
  underAddressee,
}: IAddAddressee) => {
  const data: IAddAddressee = {
    name,
    email,
    underAddressee,
    ...(phone ? { phone } : {}),
  };
  try {
    await connectDB();
    await AddresseeModel.create(data);
  } catch (error) {
    console.log(error);
  }
};
