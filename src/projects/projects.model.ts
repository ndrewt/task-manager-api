import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: { createdAt: 'date_add', updatedAt: 'date_update' } })
export class Project {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  users: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
