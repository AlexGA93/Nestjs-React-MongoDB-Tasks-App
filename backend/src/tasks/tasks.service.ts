import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas';
import { Model } from 'mongoose';
import { CreateTaskDTO, UpdateTaskDTO } from 'src/dto';

@Injectable()
export class TasksService {
  // @InjectModel() -> Inject mongoose model using nestjs/mongoose decorator passing the created Task class name
  // private taskModel -> We're goinh to declare this injection as private with a name
  // : Model<Task> -> This injection has a defined type as mongoose Model based in the Task model that we created
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  // HTTP Requests
  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find();
  }
  async getSingleTask(taskId: string): Promise<Task> {
    return await this.taskModel.findById(taskId);
  }
  async createNewTask(taskData: CreateTaskDTO): Promise<Task> {
    // generate a new task model
    const newTask = new this.taskModel(taskData);
    // save new task in the database
    return await newTask.save();
  }
  async updateTask(taskId: string, newTaskData: UpdateTaskDTO): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(taskId, newTaskData, { new: true });
  }
  async deleteTask(taskId: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(taskId);
  }
}
