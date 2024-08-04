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

  const acc = await Account.create({ email: `qwer${Math.random()}@qwer.com`, password: 'qwerty123S!' });
  await acc.save();

  // const res = await CoinMarket.getList()
  // console.log(res);
}

bootstrap().catch((err) => console.error(err));