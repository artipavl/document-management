import { prop, getModelForClass } from "@typegoose/typegoose";
import { Mongoose, Schema, model, models } from "mongoose";

export class Folder {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public href!: string;
}

const FolderModel = getModelForClass(Folder);

// const schema = new Schema({ name: String, href: String });
// const FolderModel = models.Customer || model("Folder", schema);

export default FolderModel;
