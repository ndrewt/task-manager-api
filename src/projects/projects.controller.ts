import { Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { AddProjectDto } from './dto/addProject.dto';
import { GetProjectList } from './dto/getProjectList.dto';
import { IdProjectDto } from './dto/IdProjectDto.dto';
import { UpdateProjectDto } from './dto/updateProjectDto.dto';
import { AddUserToProjectDto } from './dto/AddUserToProjectDto.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private ProjectService: ProjectsService) {}

  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiResponse({ status: 409, description: 'Already exists' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiOperation({ summary: 'Registers new project', description: 'Required:all. Auth is required. Use Bearer token for auth.' })
  @ApiTags('Projects')
  @ApiBearerAuth()
  @Post('/add')
  register(@Body() dto: AddProjectDto, @Req() req: Request) {
    return this.ProjectService.add(dto, req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adds user to project', description: 'Required: all. Auth is **required**' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Project Not Found | User Not Found' })
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiTags('Projects')
  @Put('/addUser')
  addUser(@Body() dto: AddUserToProjectDto, @Req() req: Request) {
    return this.ProjectService.addUser(dto, req);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiOperation({ summary: 'Updates project by id', description: 'Required: id, any other field you want to update. Auth is **required**' })
  @ApiTags('Projects')
  @Put('/update')
  update(@Body() dto: UpdateProjectDto, @Req() req: Request) {
    return this.ProjectService.update(dto, req);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @ApiOperation({
    summary: 'Gets projects list with pagination',
    description: 'Auth is **not required**',
  })
  @ApiTags('Projects')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 500, description: 'Server-side error' })
  @Get('/list')
  getList(@Query() dto: GetProjectList, @Req() req: Request) {
    return this.ProjectService.getList(dto, req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Removes user from project', description: 'Required: id, userId. Auth is **required**' })
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiTags('Projects')
  @Delete('/deleteUser')
  deleteUser(@Body() dto: AddUserToProjectDto, @Req() req: Request) {
    return this.ProjectService.deleteUser(dto, req);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiOperation({ summary: 'Deletes projects by id', description: 'Required: id. Auth is **required**' })
  @ApiTags('Projects')
  @Delete('/delete')
  delete(@Query() dto: IdProjectDto, @Req() req: Request) {
    return this.ProjectService.delete(dto, req);
  }
}
