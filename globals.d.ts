declare module "*.module.css";
declare module "*.module.scss";

interface IFolder {
  _id: Types.ObjectId;
  name: string;
  href: string;
  __v: number;
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
  employees?: string[];
  dependent?: Types.ObjectId;
}

interface IDepartment {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
  employees: string[];
  dependent?: string;
}
