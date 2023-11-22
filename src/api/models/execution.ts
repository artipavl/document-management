import { prop, getModelForClass } from "@typegoose/typegoose";

export class Execution {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public href!: string;
}

const ExecutionModel = getModelForClass(Execution);

export default ExecutionModel;
