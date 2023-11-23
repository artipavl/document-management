import { prop, getModelForClass, type Ref } from "@typegoose/typegoose";
import { Addressee } from "./addressee";
import { Folder } from "./folder";
import { User } from "./user";
import { Importance } from "./importance";
import { Periodicity } from "./periodicity";
import { Execution } from "./execution";

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

  @prop({ required: false, ref: Periodicity })
  public controlFrequency?: Ref<Periodicity>;

  @prop({ required: false, ref: User })
  public controlPerson?: Ref<User>;

  @prop({ required: false, ref: User })
  public controlExecutor?: Ref<User>;

  @prop({ required: false, ref: Importance })
  public importance?: Ref<Importance>;

  @prop()
  public controlDate?: string;

  @prop({ ref: Folder })
  public folder!: Ref<Folder>;

  @prop({ type: () => Resolution, default: [] })
  public resolutions!: Resolution[];

  @prop({ type: () => Letter, default: [] })
  public letters!: Letter[];

  @prop()
  public removalControlText?: string;
  @prop()
  public removalControlDate?: string;

  @prop({ required: false, ref: Execution })
  public removalControlType?: Ref<Execution>;


  @prop({ required: false, ref: User })
  public removalControlSignature?: Ref<User>;
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
