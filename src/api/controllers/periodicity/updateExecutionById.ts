import PeriodicityModel from "@/api/models/periodicity";
import connectDB from "../../connect-db";
import translit from "@/helpers/translit";

interface updatePeriodicityProps {
  name: string;
}

export const updatePeriodicityById = async (
  data: updatePeriodicityProps,
  id: string
) => {
  try {
    await connectDB();
    await PeriodicityModel.findByIdAndUpdate(id, {
      name: data.name.toLowerCase(),
      href: translit(data.name),
    });
  } catch (error) {
    console.log(error);
  }
};
