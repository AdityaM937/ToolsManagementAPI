import { MiddlewareConsumer, Module } from '@nestjs/common';

import { CustomLoggerService } from './custom-logger.service';
import { LoggerHelperService } from './logger-helper.service';
import { Store, asyncLocalStorage } from './storage';
@Module({
  providers: [
    LoggerHelperService,
    CustomLoggerService
  ],
  exports: [LoggerHelperService, CustomLoggerService]
})
export class LoggerModule {
  constructor(
    private readonly loggerService: LoggerHelperService,
  ) {}
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(this.requestIdMiddleware).forRoutes('/');
  }
  requestIdMiddleware = (req, res, next) => {
    asyncLocalStorage.run(
      new Store(this.loggerService.randomString()),
      async () => {
        next();
      }
    );
  };
}
