import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "./task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    }

    
    async getAllTasks(): Promise<Task[]> {
        return this.taskModel.find().populate('workspaceId','name description').populate('assignedTo','name email role').exec();
    }

    async updateTaskStatus(taskId: string, updateData: UpdateTaskStatusDto, userId: string): Promise<Task> {
        const task = await this.taskModel.findById(taskId);
        if(!task){
            throw new NotFoundException(`Task with ID ${taskId} not found`);
        }
        if(task.assignedTo.toString() !== userId){
            throw new ForbiddenException('You can only update tasks which are assigned to you')
        }

        task.status= updateData.status;
        const updatedTask = await task.save();

        
        return updatedTask.populate('assignedTo', 'name email');
    }
}