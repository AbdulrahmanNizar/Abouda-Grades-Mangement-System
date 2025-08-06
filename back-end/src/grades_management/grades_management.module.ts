import { Module } from '@nestjs/common';
import { GradesManagementController } from './grades_management.controller';
import { GradesManagementService } from './grades_management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { usersGradesManagementSchema } from './grades_management.model';
import { JwtModule } from '@nestjs/jwt';
import { userSchema } from 'src/registration/registration.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'usersGrades', schema: usersGradesManagementSchema },
    ]),
    JwtModule.register({
      secret: 'Abouda@Jsonwebtoken123',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [GradesManagementController],
  providers: [GradesManagementService],
})
export class GradesManagementModule {}
