import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

ConfigModule.forRoot({
  envFilePath: __dirname + `/.env`,
  isGlobal: true,
});
export const config: TypeOrmModuleOptions = {
  type: 'postgres',// process.env.DB_TYPE as 'postgres',
  host:'localhost',// process.env.DB_HOST,
  port: 5432,//parseInt(process.env.PGPORT),
  username: 'postgres',//process.env.PGUSER,
  synchronize:true,
  password: '123456',//process.env.PGPASSWORD,
  database: 'toolsmanagements_db',//process.env.PGDATABASE,
  extra: {
    charset: 'utf8mb4_unicode_ci'
  },
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  logging: Boolean(process.env.DB_LOGGING),
};
