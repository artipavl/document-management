import AddresseeModel from "@/api/models/addressee";
import connectDB from "../../connect-db";
import FolderModel from "@/api/models/folder";

export const addAddressee = async ({
  name,
  email,
  phone = "-",
  underAddressee = [],
}: IAddAddressee) => {
  try {
    await connectDB();
    await AddresseeModel.create({
      name,
      email,
      phone,
      underAddressee,
    });
  } catch (error) {
    console.log(error);
  }
};
