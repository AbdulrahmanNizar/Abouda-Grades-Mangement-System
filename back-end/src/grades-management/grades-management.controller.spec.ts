import { Test, TestingModule } from '@nestjs/testing';
import { GradesManagementController } from './grades-management.controller';

describe('GradesManagementController', () => {
  let controller: GradesManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradesManagementController],
    }).compile();

    controller = module.get<GradesManagementController>(
      GradesManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
