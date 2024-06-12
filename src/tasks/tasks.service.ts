import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument } from './tasks.model';
import { Model } from 'mongoose';
import { ValidationExeption } from '../validator/validator.exeption';
import { AuthService } from 'src/auth/auth.service';
import { GetTaskListDto } from './dto/getTaskList.dto';
import { IdDto } from './dto/IdDto.dto';
import { UpdateTaskDto } from './dto/updateTaskDto.dto';
import { AddUserToTaskDto } from './dto/AddUserToTaskDto.dto';
import { AddTaskDto } from './dto/addTaskdto';
import { ProjectsService } from 'src/projects/projects.service';
import { ChangeStatusDto } from './dto/changeStatusDTO.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('tasks') private TasksModel: Model<TaskDocument>,
    private readonly AuthService: AuthService,
    private readonly ProjectService: ProjectsService,
  ) {}

  async add(dto: AddTaskDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);
    const foundProject = await this.ProjectService.getProjectById(dto.projectId);
    const foundTask = await this.TasksModel.findOne({ name: dto.name });
    if (!foundProject) throw new ValidationExeption({ id: '', error: false, errors: ['Project not found'] }, 404);
    else {
      if (!foundTask) {
        const created = new this.TasksModel(dto);
        created.save();
        return { id: created._id, error: false, errors: [] };
      } else {
        throw new ValidationExeption({ id: '', error: false, errors: ['Already exists'] }, 409);
      }
    }
  }

  async addUser(dto: AddUserToTaskDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);
    await this.AuthService.getUserById(dto.userId);
    const foundTask = await this.TasksModel.findOne({ _id: dto.id });
    if (foundTask) {
      const usersSet = new Set(foundTask.users);
      usersSet.add(dto.userId);
      foundTask.users = Array.from(usersSet);
      await foundTask.save();
      return { id: dto.id, error: false, errors: [] };
    } else {
      throw new ValidationExeption({ id: '', error: false, errors: ['Task not found'] }, 404);
    }
  }

  async update(dto: UpdateTaskDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);

    const foundTask = await this.TasksModel.findOne({ _id: dto.id });
    if (foundTask) {
      if (dto.projectId && dto.projectId != foundTask.projectId.toString()) {
        const foundProject = await this.ProjectService.getProjectById(dto.projectId);
        if (!foundProject) throw new ValidationExeption({ id: '', error: false, errors: ['Project not found'] }, 404);
      }
      await this.TasksModel.findByIdAndUpdate(dto.id, dto).exec();
      return { id: dto.id, error: false, errors: [] };
    } else {
      throw new ValidationExeption({ id: '', error: false, errors: ['Task not found'] }, 404);
    }
  }

  async changeStatus(dto: ChangeStatusDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);
    const task = await this.TasksModel.findById(dto.id);
    if (!task) {
      throw new ValidationExeption({ id: '', error: false, errors: ['Task not found'] }, 404);
    }
    task.status = dto.status;
    await task.save();
    return { taskId: dto.id, error: false, errors: [] };
  }

  async getList(dto: GetTaskListDto, req: Request) {
    const page = Number(dto.page) || 1;
    let per_page = Number(dto.per_page) || 10;
    const sortBy = dto.sortBy || 'createdAt';
    const sortOrder = dto.sortOrder || 'desc';

    const filter = {};
    if (dto.status) filter['status'] = dto.status;
    if (dto.projectId) filter['projectId'] = dto.projectId;

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const countAllRows = await this.TasksModel.countDocuments(filter);
    if (per_page > countAllRows || per_page == 0) per_page = countAllRows;
    const offset = (page - 1) * per_page;

    const allRows = await this.TasksModel.find(filter).sort(sort).skip(offset).limit(per_page).select('-__v');

    return {
      page: page,
      all_pages: Math.ceil(countAllRows / per_page),
      per_page: per_page,
      all_rows: countAllRows,
      rows: allRows,
    };
  }
  async deleteUser(dto: AddUserToTaskDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);

    const foundTask = await this.TasksModel.findOne({ _id: dto.id });
    if (foundTask) {
      const index = foundTask.users.indexOf(dto.userId);
      if (index !== -1) {
        foundTask.users.splice(index, 1);
        await foundTask.save();
        return { id: dto.id, error: false, errors: [] };
      } else {
        throw new ValidationExeption({ id: '', error: false, errors: ['User not found in project'] }, 404);
      }
    } else {
      throw new ValidationExeption({ id: '', error: false, errors: ['Task not found'] }, 404);
    }
  }
  async delete(dto: IdDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);

    const foundTask = await this.TasksModel.findOne({ _id: dto.id });

    if (foundTask) {
      await this.TasksModel.deleteOne({ _id: dto.id }).exec();
      return { id: dto.id, error: false, errors: [] };
    } else {
      throw new ValidationExeption({ id: 0, error: false, errors: ['Not Found'] }, 404);
    }
  }
}
