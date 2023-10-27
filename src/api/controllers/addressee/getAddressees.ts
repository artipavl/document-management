import AddresseeModel from "@/api/models/addressee";
import connectDB from "../../connect-db";

export const getAddressees = async (): Promise<IAddressee[]> => {
  try {
    await connectDB();
    const addressees = await AddresseeModel.find({});

    const addresseesAsString: IAddressee[] = addressees.map((addresse) => {
      return {
        ...addresse.toJSON(),
        _id: addresse._id.toString(),
      };
    });

    return addresseesAsString as IAddressee[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
