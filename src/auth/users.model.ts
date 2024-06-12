import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: 'date_add', updatedAt: 'date_update' } })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  LastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
