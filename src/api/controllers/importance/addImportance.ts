import translit from "@/helpers/translit";
import connectDB from "../../connect-db";
import ImportanceModel from "@/api/models/importance";

interface AddImportanceProps {
  name: string;
}

export const addImportance = async ({ name }: AddImportanceProps) => {
  try {
    await connectDB();
    const Importance = await ImportanceModel.create({
      name: name.toLowerCase(),
      href: translit(name),
    });
    return Importance;
  } catch (error) {
    console.log(error);
  }
};


