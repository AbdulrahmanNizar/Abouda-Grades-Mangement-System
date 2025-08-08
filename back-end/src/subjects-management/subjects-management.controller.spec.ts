import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsManagementController } from './subjects-management.controller';

describe('SubjectsManagementController', () => {
  let controller: SubjectsManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectsManagementController],
    }).compile();

    controller = module.get<SubjectsManagementController>(SubjectsManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
