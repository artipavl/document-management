import DocumentModel from "@/api/models/document";
import connectDB from "../../connect-db";
import removeUndefinedValues from "@/helpers/removeUndefinedValues";

//перевірити на передачу undef... значень
export const updateDocumentById = async (data: IAddDocument, id: string) => {
  console.log("lfnf " + data);
  console.log(removeUndefinedValues(data));
  try {
    await connectDB();
    const r = await DocumentModel.findByIdAndUpdate(
      id,
      removeUndefinedValues(data)
    );
    console.log(r);
  } catch (error) {
    console.log(error);
  }
};
