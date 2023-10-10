import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

class UnderAddressee {
  @prop({})
  public name!: string;

  @prop({})
  public peopleName: string;
}

class Addressee {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: false })
  public phone?: string;

  @prop({ type: () => UnderAddressee, default: [] })
  public underAddressee?: UnderAddressee[];
}

const AddresseeModel = getModelForClass(Addressee);

export default AddresseeModel;
