import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({timestamps: true})
export class Task extends Document {
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({ default: 'todo', enum: ['todo','in_progress','completed']})
    status:string;

    @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
    workspaceId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true})
    assignedTo: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);