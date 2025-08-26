import { Module } from '@nestjs/common';
import { MailesManagementService } from './mailes-management.service';
import { MailesManagementController } from './mailes-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/registration/registration.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  controllers: [MailesManagementController],
  providers: [MailesManagementService],
})
export class MailesManagementModule {}
