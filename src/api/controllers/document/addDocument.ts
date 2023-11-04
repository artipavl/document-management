import DocumentModel from "@/api/models/document";
import connectDB from "../../connect-db";

export const addDocument = async ({
  number,
  date,
  title,
  remark,
  control,
  folder,
  description,
  addressee,
  addresseeSignature,
  documentDate,
  documentNumber,
  controlFrequency,
}: IAddDocument) => {
  const data: IAddDocument = {
    number,
  date,
  title,
  remark,
  control,
  folder,
    ...(description ? { description } : {}),
    ...(addressee ? { addressee } : {}),
    ...(addresseeSignature ? { addresseeSignature } : {}),
    ...(documentDate ? { documentDate } : {}),
    ...(documentNumber ? { documentNumber } : {}),
    ...(controlFrequency ? { controlFrequency } : {}),
  };
  try {
    await connectDB();
    await DocumentModel.create(data);
  } catch (error) {
    console.log(error);
  }
};
