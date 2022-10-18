import { Module } from '@nestjs/common';

import { Base } from './base';
import { CustomLoggerService } from './service/custom-logger.service';

import { LoggerMiddleware } from './middleware/logger.middleware';
@Module({
  imports: [],
  providers: [LoggerMiddleware,CustomLoggerService,Base],
  exports: [LoggerMiddleware, Base,CustomLoggerService]
})
export class CommonModule {}
