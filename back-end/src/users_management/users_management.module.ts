import { Module } from '@nestjs/common';
import { UsersManagementService } from './users_management.service';
import { UsersManagementController } from './users_management.controller';
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
  controllers: [UsersManagementController],
  providers: [UsersManagementService],
})
export class UsersManagementModule {}
