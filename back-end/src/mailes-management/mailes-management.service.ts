import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailesManagementService {
  constructor(private mailerService: MailerService) {}
}
