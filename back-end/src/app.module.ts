import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationModule } from './registration/registration.module';
import { GradesManagementModule } from './grades-management/grades-management.module';
import { UsersManagementModule } from './users-management/users-management.module';
import { SubjectsManagementModule } from './subjects-management/subjects-management.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    RegistrationModule,
    GradesManagementModule,
    UsersManagementModule,
    SubjectsManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
