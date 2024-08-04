import { Database } from "./database";
import { WebServer } from "./webServer";

async function bootstrap() {
  await Database.connect({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await WebServer.start(Number(process.env.PORT) || 5555);
}

bootstrap().catch((err) => console.error(err));