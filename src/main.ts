import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { CustomLoggerService } from './common/service/custom-logger.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get<CustomLoggerService>(CustomLoggerService);
  app.useLogger(logger);

  app.enableCors({
    methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 200
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('tools management api')
    .setDescription('Tools-Management Api Documentation')
    .addServer('http://')
    .addServer('https://')
    .addBearerAuth()
    .addApiKey()
    .setExternalDoc('Postman Collection', '/docs-json')  /** Adding postman import  api-json*/
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true
  });
  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
