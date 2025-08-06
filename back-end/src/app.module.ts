import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationModule } from './registration/registration.module';
import { GradesManagementModule } from './grades_management/grades_management.module';
import { UsersManagementController } from './users_management/users_management.controller';
import { UsersManagementService } from './users_management/users_management.service';
import { UsersManagementModule } from './users_management/users_management.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/abouda-grades'),
    RegistrationModule,
    GradesManagementModule,
    UsersManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
