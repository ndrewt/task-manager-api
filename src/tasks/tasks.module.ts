import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksSchema } from './tasks.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'tasks', schema: TasksSchema }]), AuthModule, ProjectsModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
