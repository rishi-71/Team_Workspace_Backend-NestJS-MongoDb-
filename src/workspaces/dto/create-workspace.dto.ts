import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty({ message: 'Workspace name is compulsory' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['active', 'archived', 'completed'], {
    message: 'Status can only be active,archived or completed',
  })
  status?: string;
}
