import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true})
export class Signup {
  @Prop()
  username: string;

  @Prop({unique:true})
  email: string;

  @Prop()
  password: string;
  
  @Prop()
  resetToken: string
}

export type SignupDocument = Signup & Document;
export const SignupSchema = SchemaFactory.createForClass(Signup);