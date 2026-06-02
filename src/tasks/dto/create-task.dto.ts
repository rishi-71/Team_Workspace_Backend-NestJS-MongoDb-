import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Task title is required'})
    title: string;

    @IsString()
    @IsOptional()
    description? : string;

    @IsMongoId({message: 'Invalid workspace ID format'})
    @IsNotEmpty()
    workspaceId: string;

    @IsMongoId({ message: 'Invalid User Id format'})
    @IsNotEmpty()
    assignedTo: string;
}