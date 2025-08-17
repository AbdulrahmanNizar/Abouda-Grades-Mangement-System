import { Module } from '@nestjs/common';
import { GradesManagementController } from './grades-management.controller';
import { GradesManagementService } from './grades-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { gradesTablesManagementSchema } from './grades-management.model';
import { JwtModule } from '@nestjs/jwt';
import { userSchema } from 'src/registration/registration.model';
import jwtConfig from '../registration/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'gradesTables', schema: gradesTablesManagementSchema },
      { name: 'User', schema: userSchema },
    ]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [GradesManagementController],
  providers: [GradesManagementService],
})
export class GradesManagementModule {}
