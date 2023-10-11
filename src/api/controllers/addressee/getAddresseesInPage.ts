import AddresseeModel from "@/api/models/addressee";
import connectDB from "../../connect-db";

export const getAddresseesInPage = async ({
  query,
  page = 1,
  limit = 10,
}: {
  query?: string;
  page: number;
  limit: number;
}): Promise<{ addressees: IAddressee[]; total: number }> => {
  try {
    let total = 0;
    const skip = (page - 1) * limit;
    await connectDB();

    const pipeline: PipelineStage[] = [{ $skip: skip }, { $limit: limit }];

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
      const [result] = await AddresseeModel.aggregate([
        unshift,
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }
    
    const Addressees = await AddresseeModel.aggregate(pipeline);

    if (Addressees.length > 0) {
      const [result] = await AddresseeModel.aggregate([
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }

    return { addressees: Addressees as IAddressee[], total };
  } catch (error) {
    console.log(error);
    return { addressees: [], total: 0 };
  }
};

type PipelineStage =
  | {
      $search: {
        index: string;
        text: {
          query: string;
          fuzzy: {};
          path: {
            wildcard: string;
          };
        };
      };
    }
  | {
      $skip: number;
    }
  | {
      $limit: number;
    };
