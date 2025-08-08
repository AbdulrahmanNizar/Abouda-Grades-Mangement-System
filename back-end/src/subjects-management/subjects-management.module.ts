import { Module } from '@nestjs/common';
import { SubjectsManagementController } from './subjects-management.controller';
import { SubjectsManagementService } from './subjects-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/registration/registration.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    JwtModule.register({
      secret: 'Abouda@Jsonwebtoken123',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [SubjectsManagementController],
  providers: [SubjectsManagementService],
})
export class SubjectsManagementModule {}
