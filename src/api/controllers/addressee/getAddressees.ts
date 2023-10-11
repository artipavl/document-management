import AddresseeModel from "@/api/models/addressee";
import connectDB from "../../connect-db";

export const getAddressees = async (): Promise<IAddressee[]> => {
  try {
    await connectDB();
    const Addressees = await AddresseeModel.find({});
    return Addressees as IAddressee[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
