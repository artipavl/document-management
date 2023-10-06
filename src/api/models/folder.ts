import { prop, getModelForClass } from "@typegoose/typegoose";

class Folder {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public href!: string;
}

const FolderModel = getModelForClass(Folder);

export default FolderModel;
