import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkspacesService {
    getHelloMessage(): string{
        return "Hello from workspaces service";
    }
}
