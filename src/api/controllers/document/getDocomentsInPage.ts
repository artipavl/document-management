import FolderModel from "@/api/models/folder";
import connectDB from "../../connect-db";
import DocumentModel from "@/api/models/document";

export const getDocomentsInPage = async ({
  query,
  page = 1,
  limit = 10,
  sort,
  issort,
  folder,
}: {
  query?: string;
  page: number;
  limit: number;
  sort: string;
  issort: 1 | -1;
  folder?: string;
}): Promise<{ documents: IDocument[]; total: number }> => {
  try {
    let total = 0;
    const skip = (page - 1) * limit;
    await connectDB();
    let folderId: string | null = null;

    if (folder) {
      const sumFolder: IFolder | null = await FolderModel.findOne({
        href: folder,
      });
      folderId = sumFolder ? sumFolder._id : null;
    }

    const pipeline: PipelineStage[] = [
      { $skip: skip },
      { $limit: limit },
      {
        $match: {
          // folder: folderId,
          ...(folderId ? { folder: folderId } : {}),
        },
      },
    ];

    if (query) {
      const unshift = {
        $search: {
          index: "search",
          text: {
            query,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 3,
              maxExpansions: 50,
            },
            path: {
              wildcard: "*",
            },
          },
        },
      };
      pipeline.unshift(unshift);
      const [result] = await DocumentModel.aggregate([
        unshift,
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }

    const pipelineLookup = [
      {
        $lookup: {
          from: "folders",
          localField: "folder",
          foreignField: "_id",
          as: "folderData",
        },
      },
      {
        $unwind: "$folderData",
      },
      {
        $addFields: {
          folderName: "$folderData.name",
          folderHref: "$folderData.href",
        },
      },
      {
        $project: {
          number: 1,
          date: 1,
          title: 1,
          description: 1,
          addressee: 1,
          addresseeSignature: 1,
          documentDate: 1,
          documentNumber: 1,
          remark: 1,
          control: 1,
          controlFrequency: 1,
          controlExecutor: 1,
          folder: 1,
          folderHref: 1,
          folderName: 1,
          removalControlText: 1,
          removalControlDate: 1,
          removalControlSignature: 1,
          removalControlType: 1,
          resolutions: {
            text: 1,
            date: 1,
            signature: 1,
          },
          letters: {
            number: 1,
            text: 1,
            date: 1,
            dateShipment: 1,
            signature: 1,
            addressee: 1,
            addresseeSignature: 1,
          },
        },
      },
    ];

    const documents: IDocument[] = await DocumentModel.aggregate([
      ...pipeline,
      ...pipelineLookup,
    ]).sort({
      [sort]: issort,
    });

    if (documents.length > 0) {
      const [result] = await DocumentModel.aggregate([
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }
    const documentsAsString: IDocument[] = documents.map((document) => {
      return {
        ...document,
        _id: document._id.toString(),
        controlExecutor: document.controlExecutor?.toString(),
        removalControlSignature: document.removalControlSignature?.toString(),
        folder: document.folder.toString(),
        ...(document.addressee
          ? { addressee: document.addressee.toString() }
          : {}),
        resolutions: document.resolutions.map((resolution) => {
          return {
            ...resolution,
            signature: resolution.signature?.toString(),
          };
        }),
        letters: document.letters.map((letter) => {
          return {
            ...letter,
            signature: letter.signature?.toString(),
            addressee: letter.addressee?.toString(),
            addresseeSignature: letter.addresseeSignature?.toString(),
          };
        }),
      };
    });
    return { documents: documentsAsString, total };
  } catch (error) {
    console.log(error);
    return { documents: [], total: 0 };
  }
};
