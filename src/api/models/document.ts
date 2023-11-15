import { prop, getModelForClass, type Ref } from "@typegoose/typegoose";
import { Addressee } from "./addressee";
import { Folder } from "./folder";
import { User } from "./user";

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

  @prop({ required: false, ref: User })
  public controlExecutor?: Ref<User>;

  @prop({ ref: Folder })
  public folder!: Ref<Folder>;

  @prop({ type: () => Resolution, default: [] })
  public resolutions!: Resolution[];

  @prop({ type: () => Letter, default: [] })
  public letters!: Letter[];
}

class Resolution {
  @prop({})
  public text?: string;

  @prop({ ref: User })
  public signature?: Ref<User>;

  @prop({})
  public date?: string;
}

class Letter {
  @prop({})
  public text?: string;

  @prop({})
  public number?: string;

  @prop({ ref: User })
  public signature?: Ref<User>;

  @prop({})
  public date?: string;

  @prop({ ref: Addressee })
  public addressee?: Ref<Addressee>;

  @prop({})
  public dateShipment?: string;

  @prop({ ref: Addressee.name })
  public addresseeSignature?: Ref<string>;
}

const DocumentModel = getModelForClass(Document);

export default DocumentModel;
