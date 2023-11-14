import DocumentModel from "@/api/models/document";
import connectDB from "../../connect-db";
import removeUndefinedValues from "@/helpers/removeUndefinedValues";

export const addDocument = async (data: IAddDocument) => {
  try {
    await connectDB();
    await DocumentModel.create(removeUndefinedValues(data));
  } catch (error) {
    console.log(error);
  }
};
