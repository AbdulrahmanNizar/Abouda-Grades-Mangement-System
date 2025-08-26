import { Controller } from '@nestjs/common';
import { MailesManagementService } from './mailes-management.service';

@Controller('mailes-management')
export class MailesManagementController {
  constructor(
    private readonly mailesManagementService: MailesManagementService,
  ) {}
}
