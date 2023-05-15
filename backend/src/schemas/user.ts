import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserDTO } from '../interfaces/UserDTO';

@Schema()
export class User implements UserDTO {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 10 })
  bytes: number;

  @Prop({ required: true, default: ['node.js', 'python', 'java'] })
  availableCategories: string[];

  @Prop({ required: true, default: false })
  isAdmin: boolean;
}

export type UserDocument = HydratedDocument<User>;
