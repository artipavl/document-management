import ImportanceModel from "@/api/models/importance";
import connectDB from "../../connect-db";
import translit from "@/helpers/translit";

interface updateImportanceProps {
  name: string;
}

export const updateImportanceById = async (
  data: updateImportanceProps,
  id: string
) => {
  try {
    await connectDB();
    await ImportanceModel.findByIdAndUpdate(id, {
      name: data.name.toLowerCase(),
      href: translit(data.name),
    });
  } catch (error) {
    console.log(error);
  }
};
