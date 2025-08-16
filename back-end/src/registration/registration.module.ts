import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './registration.model';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
