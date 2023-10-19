import AddresseeModel from "@/api/models/addressee";
import connectDB from "../../connect-db";

export const updateAddresseeById = async (data: IAddAddressee, id: string) => {
  try {
    await connectDB();
    const Addressees = await AddresseeModel.findByIdAndUpdate(id, data);
    return Addressees as IAddressee;
  } catch (error) {
    console.log(error);
  }
};
