import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UsersModule,
    MongooseModule.forRoot
      ('mongodb+srv://abumfarrehb:9cSZK*f92R$useK@cluster0.gtkc77o.mongodb.net/')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
