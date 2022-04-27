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

const SERVER = process.env.NODE_ENV !== "production" ? "::" : "localhost";
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TypeORMExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle("ADK/p202 Superhero API")
    .setDescription("ADK/p202 Superhero API")
    .setVersion("1.0")
    .addApiKey({ type: "apiKey", name: "apiKey", in: "header" }, "apiKey")
    .build();
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "ADK/p202 Superhero API",
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document, customOptions);
 
  await app.listen(Number(PORT ), SERVER);
 
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
