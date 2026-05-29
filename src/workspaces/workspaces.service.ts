import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from './schemas/workspace.schema';
import { Model } from 'mongoose';

@Injectable()
export class WorkspacesService {
 constructor(@InjectModel(Workspace.name) private workspaceModel: Model<Workspace>){}

 async createWorkspace(workspaceData: any): Promise<Workspace>{
    const newWorkspace = new this.workspaceModel(workspaceData);
    return newWorkspace.save();
 }

 async getAllWorkspaces(): Promise<Workspace[]>{
    return this.workspaceModel.find().exec();
 }
}
