import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './registration.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { subjectsSchema } from 'src/subjects-management/subjects-management.model';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'Subjects', schema: subjectsSchema },
    ]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule {}
