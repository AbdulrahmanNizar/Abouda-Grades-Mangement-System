import { Module } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';
import { UsersManagementController } from './users-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/registration/registration.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [UsersManagementController],
  providers: [UsersManagementService],
})
export class UsersManagementModule {}
