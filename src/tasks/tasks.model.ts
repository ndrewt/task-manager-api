import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: { createdAt: 'date_add', updatedAt: 'date_update' } })
export class Task {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'projects' })
  projectId: mongoose.Schema.Types.ObjectId;

  @Prop()
  users: string[];
}

export const TasksSchema = SchemaFactory.createForClass(Task);
