import DocumentModel from "@/api/models/document";
import connectDB from "../../connect-db";

//перевірити на передачу undef... значень
export const updateDocumentById = async (data: IAddDocument, id: string) => {
  const filterDtata = {};
  try {
    await connectDB();
    await DocumentModel.findByIdAndUpdate(id, removeUndefinedValues(data));
  } catch (error) {
    console.log(error);
  }
};

type ObjectWithUndefined = {
  [key: string]: any | undefined;
};

function removeUndefinedValues<T extends ObjectWithUndefined>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (obj[key]) {
      result[key] = obj[key];
    }
  }

  return result;
}
