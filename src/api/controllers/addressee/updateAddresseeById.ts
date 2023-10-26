import AddresseeModel from "@/api/models/addressee";
import connectDB from "../../connect-db";

export const updateAddresseeById = async (
  { name, email, phone, underAddressee }: IAddAddressee,
  id: string
) => {
  const data: IAddAddressee = {
    name,
    email,
    underAddressee,
    ...(phone ? { phone } : {}),
  };
  try {
    await connectDB();
    const Addressees = await AddresseeModel.findByIdAndUpdate(id, data);
    return Addressees as IAddressee;
  } catch (error) {
    console.log(error);
  }
};
