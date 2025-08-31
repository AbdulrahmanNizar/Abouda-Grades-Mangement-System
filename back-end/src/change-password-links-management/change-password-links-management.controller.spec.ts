import { Test, TestingModule } from '@nestjs/testing';
import { ChangePasswordLinksManagementController } from './change-password-links-management.controller';

describe('ChangePasswordLinksManagementController', () => {
  let controller: ChangePasswordLinksManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangePasswordLinksManagementController],
    }).compile();

    controller = module.get<ChangePasswordLinksManagementController>(ChangePasswordLinksManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
