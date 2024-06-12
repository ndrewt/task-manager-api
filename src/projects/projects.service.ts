import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectDocument } from './projects.model';
import { Model } from 'mongoose';
import { AddProjectDto } from './dto/addProject.dto';
import { ValidationExeption } from '../validator/validator.exeption';
import { AuthService } from 'src/auth/auth.service';
import { GetProjectList } from './dto/getProjectList.dto';
import { IdProjectDto } from './dto/IdProjectDto.dto';
import { UpdateProjectDto } from './dto/updateProjectDto.dto';
import { AddUserToProjectDto } from './dto/AddUserToProjectDto.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('projects') private ProjectModel: Model<ProjectDocument>,
    private readonly AuthService: AuthService,
  ) {}

  async add(dto: AddProjectDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);
    const foundProject = await this.ProjectModel.findOne({ name: dto.name });

    if (!foundProject) {
      const users = [userInfo._id];

      const created = new this.ProjectModel({ ...dto, ...{ users } });
      created.save();
      return { id: created._id, error: false, errors: [] };
    } else {
      throw new ValidationExeption({ id: '', error: false, errors: ['Already exists'] }, 409);
    }
  }

  async addUser(dto: AddUserToProjectDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);
    await this.AuthService.getUserById(dto.userId);
    const foundProject = await this.ProjectModel.findOne({ _id: dto.id });
    if (foundProject) {
      const usersSet = new Set(foundProject.users);
      usersSet.add(dto.userId);
      foundProject.users = Array.from(usersSet);
      await foundProject.save();
      return { id: dto.id, error: false, errors: [] };
    } else {
      throw new ValidationExeption({ id: '', error: false, errors: ['Project not found'] }, 404);
    }
  }

  async update(dto: UpdateProjectDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);

    const foundProject = await this.ProjectModel.findOne({ _id: dto.id });
    if (foundProject) {
      await this.ProjectModel.findByIdAndUpdate(dto.id, dto).exec();
      return { id: dto.id, error: false, errors: [] };
    } else {
      throw new ValidationExeption({ id: '', error: false, errors: ['Project not found'] }, 404);
    }
  }

  async getList(dto: GetProjectList, req: Request) {
    const page = Number(dto.page) || 1;
    let per_page = Number(dto.per_page) || 10;

    const countAllRows = await this.ProjectModel.countDocuments();
    if (per_page > countAllRows || per_page == 0) per_page = countAllRows;
    const offset = (page - 1) * per_page;

    const allRows = await this.ProjectModel.find().skip(offset).limit(per_page).select('-__v');

    if (allRows.length > 0) {
      return {
        page: page,
        all_pages: Math.ceil(countAllRows / per_page),
        per_page: per_page,
        all_rows: countAllRows,
        rows: allRows,
      };
    } else {
      return {
        page: page,
        all_pages: 0,
        per_page: per_page,
        all_rows: 0,
        rows: [],
      };
    }
  }
  async deleteUser(dto: AddUserToProjectDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);

    const foundProject = await this.ProjectModel.findOne({ _id: dto.id });
    if (foundProject) {
      const index = foundProject.users.indexOf(dto.userId);
      if (index !== -1) {
        foundProject.users.splice(index, 1);
        await foundProject.save();
        return { id: dto.id, error: false, errors: [] };
      } else {
        throw new ValidationExeption({ id: '', error: false, errors: ['User not found in project'] }, 404);
      }
    } else {
      throw new ValidationExeption({ id: '', error: false, errors: ['Project not found'] }, 404);
    }
  }
  async delete(dto: IdProjectDto, req: Request) {
    const userInfo = await this.AuthService.checkAuth(req.headers['authorization']);

    const foundProject = await this.ProjectModel.findOne({ _id: dto.id });

    if (foundProject) {
      await this.ProjectModel.deleteOne({ _id: dto.id }).exec();
      return { id: dto.id, error: false, errors: [] };
    } else {
      throw new ValidationExeption({ id: 0, error: false, errors: ['Not Found'] }, 404);
    }
  }

  //for another services

  async getProjectById(id: string) {
    const found = await this.ProjectModel.findOne({ _id: id }).exec();
    if (!found) throw new ValidationExeption({ id: '', error: false, errors: ['Project Not Found'] }, 400);

    return found;
  }
}
