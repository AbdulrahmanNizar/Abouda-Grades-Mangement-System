import { Module } from '@nestjs/common';
import { SubjectsManagementController } from './subjects-management.controller';
import { SubjectsManagementService } from './subjects-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/registration/registration.model';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../registration/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [SubjectsManagementController],
  providers: [SubjectsManagementService],
})
export class SubjectsManagementModule {}
