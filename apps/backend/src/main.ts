import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const frontendUrl = process.env.FRONTEND_URL;
  app.enableCors({
    origin: frontendUrl ? frontendUrl.split(",").map((url) => url.trim()) : true,
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle("7GG Pay Wallet Backend MVP")
    .setDescription("Mock-only wallet address, deposit, AML screening, isolation, and sweep backend. No real blockchain, keys, or payments.")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
}

void bootstrap();
