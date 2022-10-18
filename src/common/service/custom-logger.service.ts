import { Injectable, LoggerService } from '@nestjs/common';
import { Logger } from 'tslog';
import { asyncLocalStorage } from './storage';

@Injectable()
export class CustomLoggerService implements LoggerService {
  logger = new Logger({
    setCallerAsLoggerName: true,
    ignoreStackLevels: 4,
    displayLoggerName: false,
    requestId: (): string => {
      return asyncLocalStorage.getStore()?.requestId as string;
    }
  });
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }
}
