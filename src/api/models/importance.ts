import { prop, getModelForClass } from "@typegoose/typegoose";

export class Importance {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public href!: string;
}

const ImportanceModel = getModelForClass(Importance);

export default ImportanceModel;
