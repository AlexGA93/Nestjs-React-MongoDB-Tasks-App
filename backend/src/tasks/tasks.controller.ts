import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from 'src/dto';
import { Task } from 'src/schemas';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // service injection
  constructor(private taskService: TasksService) {}
  // HTTP Requests
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.taskService.getAllTasks();
  }

  @Get(':id')
  async getSingleTask(@Param('id') taskId: string): Promise<Task> {
    const task = await this.taskService.getSingleTask(taskId);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Post()
  async createNewTask(@Body() requestBody: CreateTaskDTO): Promise<Task> {
    try {
      return await this.taskService.createNewTask(requestBody);
    } catch (error) {
      if (error.code === 11000) {
        // mongoose error
        throw new ConflictException('Task already exists');
      }
      throw error;
    }
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() taskBody: UpdateTaskDTO,
  ): Promise<Task> {
    return await this.taskService.updateTask(taskId, taskBody);
  }

  @Delete(':id')
  // decorator that returns a status code instead the deleted task
  @HttpCode(204)
  async deleteTask(@Param('id') taskId: string): Promise<Task> {
    const deletedTask = await this.taskService.deleteTask(taskId);
    if (!deletedTask) throw new NotFoundException('Task not found');
    return deletedTask;
  }
}
