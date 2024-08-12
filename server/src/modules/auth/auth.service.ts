import { Cache } from "../../adapters/cacheAdapter";
import { Database } from "../../adapters/databaseAdapter";
import { BcryptService } from "../../shared/bcrypt.service";
import { JwtService } from "../../shared/jwt.service";
import { AccoutnService } from "../accounts/account.service";
import { AccountParams } from "../accounts/account.types";

type SignInParams = {
  email: string;
  password: string;
}

type SignInData = {
  token: string;
  account: AccountParams;
}

export class AuthService {
  accountService: AccoutnService;
  constructor () {
    this.accountService = new AccoutnService(Database.instance.models.Accounts);
  }

  async signIn(data: SignInParams): Promise<SignInData> {
    const currentAccount = await this.accountService.getOne({ where: { email: data.email } });

    if (!currentAccount) {
      throw new Error('account not found'); // TODO write error exception for possibility set code status
    }

    const { password, ...accountData } = currentAccount.toJSON();

    const passwordsCompare = await BcryptService.compare(data.password, password);

    if (!passwordsCompare) {
      throw new Error('passwords not compare');
    }

    const token = await JwtService.sign({ ...accountData });

    await Cache.set(`${accountData.id}-token`, token);

    return { token, account: accountData };
  }

}