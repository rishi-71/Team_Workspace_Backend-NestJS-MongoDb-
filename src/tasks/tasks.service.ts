import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "./task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }
}