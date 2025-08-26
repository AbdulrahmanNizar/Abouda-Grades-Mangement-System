import { Test, TestingModule } from '@nestjs/testing';
import { MailesManagementController } from './mailes-management.controller';

describe('MailesManagementController', () => {
  let controller: MailesManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailesManagementController],
    }).compile();

    controller = module.get<MailesManagementController>(MailesManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
