declare module "*.module.css";
declare module "*.module.scss";

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
    }
  | { $set: object }
  | { $project: object }
  | { $match: object };

interface IFolder {
  _id: string;
  name: string;
  href: string;
}

interface IUnderAddressee {
  name: string;
  peopleName: string;
}

interface IAddressee {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  underAddressee?: IUnderAddressee[];
  __v: number;
}

interface IAddAddressee {
  name: string;
  email: string;
  phone?: string;
  underAddressee: IUnderAddressee[];
}

interface IAddFolder {
  name: string;
}

type T = any;

interface IAddDepartment {
  name: string;
  email: string;
  phone?: string;
  description?: string;
  dependent?: string;
}

interface IDepartment {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
  employees: IUser[];
  dependent?: string;
}

interface IAddUser {
  name: string;
  surname: string;
  lastName?: string;
  email: string;
  phone?: string;
  jobPosition?: string;
  department?: string;
  birthday?: string;
  startWork?: string;
  finishWork?: string;
}

interface IUser {
  _id: string;
  name: string;
  surname: string;
  lastName?: string;
  email: string;
  phone?: string;
  jobPosition?: string;
  department?: string;
  birthday?: string;
  startWork?: string;
  finishWork?: string;
}

interface IAddDocument {
  number: string;
  date: string;
  title: string;
  description?: string;
  addressee?: string;
  addresseeSignature?: string;
  documentDate?: string;
  documentNumber?: string;
  remark: string;
  control: boolean;
  controlFrequency?: string;
  folder: string;
}

interface IDocument {
  _id: string;
  number: string;
  date: string;
  title: string;
  description?: string;
  addressee?: string;
  addresseeSignature?: string;
  documentDate?: string;
  documentNumber?: string;
  remark: string;
  control: boolean;
  controlFrequency?: string;
  folder: string;
  folderHref: string;
  folderName: string;
}
