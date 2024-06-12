import { Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddTaskDto } from './dto/addTaskdto';
import { GetTaskListDto } from './dto/getTaskList.dto';
import { IdDto } from './dto/IdDto.dto';
import { UpdateTaskDto } from './dto/updateTaskDto.dto';
import { AddUserToTaskDto } from './dto/AddUserToTaskDto.dto';
import { TasksService } from './tasks.service';
import { ChangeStatusDto } from './dto/changeStatusDTO.dto';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiResponse({ status: 409, description: 'Already exists' })
  @ApiResponse({ status: 404, description: 'Project Not Found' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiOperation({ summary: 'Registers new tasks', description: 'Required:all. Auth is required. Use Bearer token for auth.<br> status = new | in_process | completed' })
  @ApiTags('Tasks')
  @ApiBearerAuth()
  @Post('/add')
  register(@Body() dto: AddTaskDto, @Req() req: Request) {
    return this.TasksService.add(dto, req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adds user to task', description: 'Required: all. Auth is **required**' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Tasks Not Found | User Not Found' })
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiTags('Tasks')
  @Put('/addUser')
  addUser(@Body() dto: AddUserToTaskDto, @Req() req: Request) {
    return this.TasksService.addUser(dto, req);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiResponse({ status: 404, description: 'Not Found | Project Not Found' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiOperation({ summary: 'Updates task by id', description: 'Required: id, any other field you want to update. Auth is **required**<br> status = new | in_process | completed' })
  @ApiTags('Tasks')
  @Put('/update')
  update(@Body() dto: UpdateTaskDto, @Req() req: Request) {
    return this.TasksService.update(dto, req);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiOperation({ summary: 'Change task status', description: 'Required: id, status. Auth is **required**' })
  @ApiTags('Tasks')
  @Put('/changeStatus')
  changeStatus(@Body() dto: ChangeStatusDto, @Req() req: Request) {
    return this.TasksService.changeStatus(dto, req);
  }

  @ApiResponse({ status: 200, description: 'Success' })
  @ApiOperation({
    summary: 'Gets tasks list with pagination',
    description: 'Auth is **not required**',
  })
  @ApiTags('Tasks')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 500, description: 'Server-side error' })
  @Get('/list')
  getList(@Query() dto: GetTaskListDto, @Req() req: Request) {
    return this.TasksService.getList(dto, req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Removes user from task', description: 'Required: id, userId. Auth is **required**' })
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiTags('Tasks')
  @Delete('/deleteUser')
  deleteUser(@Body() dto: AddUserToTaskDto, @Req() req: Request) {
    return this.TasksService.deleteUser(dto, req);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Invalid Bearer token from authorization' })
  @ApiOperation({ summary: 'Deletes taks by id', description: 'Required: id. Auth is **required**' })
  @ApiTags('Tasks')
  @Delete('/delete')
  delete(@Query() dto: IdDto, @Req() req: Request) {
    return this.TasksService.delete(dto, req);
  }
}
