import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as exphbs from 'express-handlebars';
import * as express from 'express';
import * as methodOverride from 'method-override';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    exphbs.engine({
      extname: 'hbs',
      defaultLayout: 'main',
      partialsDir: 'views/partials',
    }),
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));
  await app.listen(3000);
}
bootstrap();
