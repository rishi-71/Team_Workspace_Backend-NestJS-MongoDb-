import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspaces')
@UseGuards(AuthGuard('jwt'))
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
