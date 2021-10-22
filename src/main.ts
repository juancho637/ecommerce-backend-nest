import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('Api for a simple e-commerce')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors();

  await app.listen(port);
}
bootstrap();
