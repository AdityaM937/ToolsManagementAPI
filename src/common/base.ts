import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CustomLoggerService } from './service/custom-logger.service';

@Injectable()
export class Base  {
  @Inject()
  protected readonly logger: CustomLoggerService;
  
  @InjectDataSource('default')
  defaultDataSource: DataSource;

  // add this method to get the proper Manager from the DataSource to run transactions
  protected async getDataSourceManager(): Promise<EntityManager> {
    //this.logger.log(this.defaultDataSource)
    this.logger.debug(this.defaultDataSource.options['username']);
    return this.defaultDataSource.manager;
  }

}
