import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { PartnersLoginModule } from './partners_login/partners_login.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: __dirname + '/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      useFactory: async()=>({
        type: 'postgres',
        host:'localhost',
        port: 5432,
        username: 'postgres',
        synchronize:true,
        password: '123456',
        database: 'toolsmanagements_db',
        // type: process.env.DB_TYPE as 'postgres',
        //   host: process.env.DB_HOST,
        //   port: parseInt(process.env.PGPORT),
        //   username: process.env.PGUSER,
        //   password: process.env.PGPASSWORD,
        //   database: process.env.PGDATABASE,
          extra: {
            charset: 'utf8mb4_unicode_ci',
            connectionLimit: 40
          },
          entities: [__dirname + '/**/*.entity.{ts,js}'],
          logging: Boolean(process.env.DB_LOGGING),
        }as TypeOrmModuleOptions),
        dataSourceFactory: async (options) => {
          const dataSource = await new DataSource(options).initialize();
          return dataSource;
        },
      }),
    PartnersLoginModule,
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
  
}
