import { prop, getModelForClass, type Ref } from "@typegoose/typegoose";
import { Department } from "./department";

class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public surname!: string;

  @prop()
  public lastName?: string;

  @prop({ required: true })
  public age!: number;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: false, default: "" })
  public phone?: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public verificationCode?: string;

  @prop()
  public token?: string;

  @prop()
  public jobPosition?: string;

  @prop({ ref: () => Department })
  public department?: Ref<Department>;
}

const UserModel = getModelForClass(User);

export default UserModel;
