import DocumentModel from "@/api/models/document";
import connectDB from "../../connect-db";
import removeUndefinedValues from "@/helpers/removeUndefinedValues";

//перевірити на передачу undef... значень
export const updateDocumentById = async (data: IAddDocument, id: string) => {
  try {
    await connectDB();
    const r = await DocumentModel.findByIdAndUpdate(
      id,
      removeUndefinedValues(data)
    );
  } catch (error) {
    console.log(error);
  }
};
