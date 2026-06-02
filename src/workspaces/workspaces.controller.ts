import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('workspaces')
@UseGuards(AuthGuard('jwt'), RolesGuard)
//Remember first authGuard checks the token then roles guard checks for the roles
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  async create(@Body() body: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(body);
  }

  @Get()
  async findAll() {
    return this.workspacesService.getAllWorkspaces();
  }

  @Delete(':id')
  @Roles('project_lead', 'faculty_lead')
  remove(@Param('id') id: string) {
    return {
      message: `Workspace with id ${id} deleted successfully by authorized user!`,
    };
  }
}
