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
    .setBasePath('api/v1')
    .addBearerAuth() // JWT 인증 추가

    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'My University API',
    customfavIcon: 'https://cdn.lunaiz.com/lunaiz_logo/logo-l.svg',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);

  console.log(`Application is running on: Production`);
}
bootstrap();
