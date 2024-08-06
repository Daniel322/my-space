import { Database } from "./adapters/databaseAdapter";
import { CoinMarket } from "./integrations/coinmarket";
import { WebServer } from "./adapters/webServer";
import { Account } from "./modules/accounts/account.model";
import { Cache } from "./adapters/cacheAdapter";
import { JwtService } from "./shared/jwt.service";

async function bootstrap() {
  await Database.connect({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await Cache.connect({}) //TODO: add url for connect in prod

  await JwtService.init(
    process.env.JWT_SECRET as string,
    process.env.JWT_TTL as string,
  );

  await WebServer.start(Number(process.env.PORT) || 5555);
  console.log(Database.instance.models, Account.instance);

  // const res = await CoinMarket.getList()
  // console.log(res);
}

bootstrap().catch((err) => console.error(err));