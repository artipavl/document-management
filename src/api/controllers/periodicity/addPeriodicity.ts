import translit from "@/helpers/translit";
import connectDB from "../../connect-db";
import PeriodicityModel from "@/api/models/periodicity";

interface AddPeriodicityProps {
  name: string;
}

export const addPeriodicity = async ({ name }: AddPeriodicityProps) => {
  try {
    await connectDB();
    const Periodicity = await PeriodicityModel.create({
      name: name.toLowerCase(),
      href: translit(name),
    });
    return Periodicity;
  } catch (error) {
    console.log(error);
  }
};


