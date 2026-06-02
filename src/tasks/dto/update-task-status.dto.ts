import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UpdateTaskStatusDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['todo', 'in_progress', 'completed'], {
        message: 'Stats can only be todo,in_progress or completed'
    })
    status: string;
}