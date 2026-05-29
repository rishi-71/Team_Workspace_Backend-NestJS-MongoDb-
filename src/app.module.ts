import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [WorkspacesModule, MongooseModule.forRoot(process.env.MONGODB_URI!)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
