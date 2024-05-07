import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from 'src/schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) { }

  async create(createTaskDto: CreateTaskDto) {
    try {
      await this.taskModel.findOne();
      const newTask = await new this.taskModel(createTaskDto);

      await newTask.save();
      return "Task successfully added";
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.taskModel.find().orFail();
    } catch (error) {
      throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      return await this.taskModel.findById(id).orFail();
    } catch (error) {
      throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      await this.taskModel.findByIdAndUpdate(id, updateTaskDto).orFail();
      return "Task Successfully Updated";
    } catch (error) {
      throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      await this.taskModel.findByIdAndDelete(id).orFail();
      return "Task Successfully Deleted";
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
