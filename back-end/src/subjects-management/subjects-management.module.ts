import { Module } from '@nestjs/common';
import { SubjectsManagementController } from './subjects-management.controller';
import { SubjectsManagementService } from './subjects-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { subjectsSchema } from './subjects-management.model';
import jwtConfig from '../registration/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subjects', schema: subjectsSchema }]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [SubjectsManagementController],
  providers: [SubjectsManagementService],
})
export class SubjectsManagementModule {}
