import { prop, getModelForClass, type Ref } from "@typegoose/typegoose";
import { Addressee } from "./addressee";
import { Folder } from "./folder";

export class Document {
  @prop({ required: true })
  public number!: string;

  @prop({ required: true })
  public date!: string;

  @prop({ required: false, default: "" })
  public description?: string;

  @prop({ ref: Addressee })
  public addressee?: Ref<Addressee>;

  @prop({ ref: Addressee.name })
  public addresseeSignature?: Ref<string>;

  @prop({ required: true })
  public title!: string;

  @prop()
  public documentDate?: string;

  @prop()
  public documentNumber?: string;

  @prop()
  public documentnType?: string;

  @prop()
  public remark!: string;

  @prop({ required: true, default: false })
  public control!: boolean;

  @prop()
  public controlFrequency?: string;

  @prop({ ref: Folder })
  public folder!: Ref<Folder>;
}

const DocumentModel = getModelForClass(Document);

export default DocumentModel;
