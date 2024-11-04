import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Swagger 설정
    const config = new DocumentBuilder()
    .setTitle('My University API')
    .setDescription('My University backend API 문서입니다.')
    .setVersion('1.0')
    .addBearerAuth() // JWT 인증 추가
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // '/api-docs' 경로에 Swagger UI 설정

  
  await app.listen(3000);

  console.log(`Application is running on: Production`);
}
bootstrap();
