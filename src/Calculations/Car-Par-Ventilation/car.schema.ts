import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Car {

  @Prop()
  projectName: string;
 
  @Prop()
  n1z: string;

  @Prop()
  n1a: string;

  @Prop()
  n1b: string;

  @Prop()
  n1c: string;

  @Prop()
  n1d: string;

  @Prop()
  n2z: string;

  @Prop()
  n2a: string;

  @Prop()
  n2b: string;

  @Prop()
  n2c: string;

  @Prop()
  n2d: string;

  @Prop()
  Pz: string;

  @Prop()
  Pa: string;

  @Prop()
  Pb: string;

  @Prop()
  Pc: string;

  @Prop()
  Pd: string;

  @Prop()
  d1z: string;

  @Prop()
  d1a: string;

  @Prop()
  d1b: string;

  @Prop()
  d1c: string;

  @Prop()
  d1d: string;

  @Prop()
  d2z: string;

  @Prop()
  d2a: string;

  @Prop()
  d2b: string;

  @Prop()
  d2c: string;

  @Prop()
  d2d: string;

  @Prop()
  Ez: string;

  @Prop()
  Ea: string;

  @Prop()
  Eb: string;

  @Prop()
  Ec: string;

  @Prop()
  Ed: string;

  @Prop()
  Tz: string;

  @Prop()
  Ta: string;

  @Prop()
  Tb: string;

  @Prop()
  Tc: string;

  @Prop()
  Td: string;

  @Prop()
  Fz: string;

  @Prop()
  Fa: string;

  @Prop()
  Fb: string;

  @Prop()
  Fc: string;

  @Prop()
  Fd: string;

  @Prop()
  A1z: string;

  @Prop()
  A1a: string;

  @Prop()
  A1b: string;

  @Prop()
  A1c: string;

  @Prop()
  A1d: string;

  @Prop()
  C: string;

  @Prop()
  a: string;

  @Prop()
  b: string;

  @Prop()
  c: string;

  @Prop()
  suggestedValue: string;

  @Prop()
  totalAirExhaust: string;

  @Prop()
  airSupplyPercentage: string;

  @Prop()
  totalAirSupply: string;
}

export type CarDocument = Car & Document;
export const CarSchema = SchemaFactory.createForClass(Car);
