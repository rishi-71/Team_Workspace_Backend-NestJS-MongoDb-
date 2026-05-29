import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Controller('workspaces')
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
}
