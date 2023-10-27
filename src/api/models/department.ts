import { prop, getModelForClass, type Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { string } from "yup";

class Department {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: false, default: "" })
  public phone?: string;

  @prop({ required: false, default: "" })
  public description?: string;

  @prop({ type: () => string, default: [], required: false })
  public employees?: string[];

  @prop({ ref: Department })
  public dependent?: Ref<Department>;
}

const DepartmentModel = getModelForClass(Department);

export default DepartmentModel;
