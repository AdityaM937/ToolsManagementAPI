import { Test, TestingModule } from '@nestjs/testing';
import { PartnersLoginService } from './partners_login.service';

describe('PartnersLoginService', () => {
  let service: PartnersLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnersLoginService],
    }).compile();

    service = module.get<PartnersLoginService>(PartnersLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
