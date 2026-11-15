import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Разрешаем запросы только с этого локального домена
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // Разрешаем отправку куки и токенов авторизации
    maxAge: 86400, // Кэширование preflight-запросов на 1 день
  });
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
