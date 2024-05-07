import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(): Promise<User> {
    const newUser = new this.userModel({
      email: 'beesan@gmail.com', first_name: 'Beesan', last_name: 'Abu Mfarreh', gender: 'Female', id: 1, identification_number: 1223434, profile_picture: 'ngsjdng'
    })
    return newUser.save();
  }

  // async createTask(): Promise<Task> {
  //   const newTask = new this.taskModel({
  //     id: 10, title: 'create UI/UX', description: 'make app pages', status: 'complete'
  //   })
  //   return newTask.save();
  // }
}
