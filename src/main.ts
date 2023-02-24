import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
// import { writeFileSync } from "fs"
// import * as path from "path"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle("Codica api")
    .setDescription("Karhaiev Vladyslav")
    .setVersion("1.0")
    .addTag("bank")
    .addTag("transaction")
    .addTag("category")
    .build()
  app.useGlobalPipes(new ValidationPipe())
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)
  // const outputPath = path.resolve(process.cwd(), "swagger.json")
  // writeFileSync(outputPath, JSON.stringify(document), { encoding: "utf8" })
  await app.listen(3000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
