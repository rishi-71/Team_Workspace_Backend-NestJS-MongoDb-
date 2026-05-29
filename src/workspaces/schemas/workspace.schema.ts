import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Workspace extends Document{
    @Prop({required: true, unique: true})
    name : string;

    @Prop({required: true})
    description : string;

    @Prop({default: 'active'})
    status: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);