import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './global/interceptors/response.interceptors';
import { GlobalExceptionFilter } from './global/filters/global.filters';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换数据类型
      whitelist: true, // 去除不在 DTO 中定义的属性
      forbidNonWhitelisted: true, // 禁止传入未在 DTO 中定义的属性
    }),
  );
  app.setGlobalPrefix('/medical');
  // app.enableCors({
  //   origin: 'http://localhost:5173', // 允许的源
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  // });
  await app.listen(process.env.PORT ?? 3000); // 无配置，默认3000
}
bootstrap();
