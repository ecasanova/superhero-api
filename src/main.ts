import { NestFactory } from "@nestjs/core";
import {
  ApiCookieAuth,
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { TypeORMExceptionFilter } from "./utils/typeorm-exceptions.filter";
import * as bodyParser from "body-parser";

const SERVER = process.env.API_HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TypeORMExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle("Superhero API")
    .setDescription("Superhero API")
    .setVersion("1.1")
    .addApiKey({ type: "apiKey", name: "apiKey", in: "header" }, "apiKey")
    .build();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "ADK Superhero API",
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document, customOptions);
  app.enableCors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization, apiKey",
  });
  await app.listen(Number(PORT), SERVER);

  console.log(`------------------------------------------------------`);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Enviroment: ${process.env.NODE_ENV}`);
  console.log(`Database: ${process.env.DB_HOST}`);
  console.log(`------------------------------------------------------`);
}

bootstrap();
