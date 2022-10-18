import { Test, TestingModule } from '@nestjs/testing';
import { PartnersLoginController } from './partners_login.controller';
import { PartnersLoginService } from './partners_login.service';

describe('PartnersLoginController', () => {
  let controller: PartnersLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnersLoginController],
      providers: [PartnersLoginService],
    }).compile();

    controller = module.get<PartnersLoginController>(PartnersLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
