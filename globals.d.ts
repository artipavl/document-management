// declare module "*.module.css";
declare module "*.module.scss";

interface IFolder {
  _id: Types.ObjectId;
  name: string;
  href: string;
  __v: number;
}
