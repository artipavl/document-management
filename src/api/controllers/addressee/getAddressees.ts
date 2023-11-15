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
        // underAddressee: addresse.underAddressee
        //   ? addresse.underAddressee.map((under) => {
        //       return {
        //         ...under,
        //         _id: under._id.toString()
        //       };
        //     })
        //   : [],
      };
    });

    return addresseesAsString.map((addressee) => {
      return {
        ...addressee,
        underAddressee: addressee.underAddressee
          ? addressee.underAddressee.map((under) => {
              return {
                ...under,
                _id: under._id.toString(),
              };
            })
          : [],
      };
    }) as IAddressee[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
