import { Database } from "./databaseAdapter";
import { CoinMarket } from "./integrations/coinmarket";
import { WebServer } from "./webServer";
import { Account } from "./database/models/account.model";

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
  console.log(Database.instance.models, Account.instance);

  // const res = await CoinMarket.getList()
  // console.log(res);
}

bootstrap().catch((err) => console.error(err));