import DocumentModel from "@/api/models/document";
import connectDB from "../../connect-db";

export const getDocuments = async (): Promise<IDocument[]> => {
  try {
    await connectDB();
    const documents = await DocumentModel.find({});

    const documentsAsString: IDocument[] = documents.map((document) => {
      return {
        ...document.toJSON(),
        _id: document._id.toString(),
        controlExecutor: document.controlExecutor?.toString(),
        folder: document.folder.toString(),
        ...(document.addressee
          ? { addressee: document.addressee.toString() }
          : {}),
      };
    });
    return documentsAsString as IDocument[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
