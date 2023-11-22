import { prop, getModelForClass } from "@typegoose/typegoose";

export class Periodicity {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public href!: string;
}

const PeriodicityModel = getModelForClass(Periodicity);

export default PeriodicityModel;
