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

  async generateTokens(data: Omit<AccountParams, 'password'>): Promise<string> {
    const token = await JwtService.sign(data);

    return token;
  }

  async signIn(data: SignInParams): Promise<SignInData> {
    try {
      const currentAccount = await this.accountService.getOne({ where: { email: data.email } });

      if (!currentAccount) {
        throw new Error('account not found'); // TODO write error exception for possibility set code status
      }
  
      const { password, ...accountData } = currentAccount.toJSON();
  
      const passwordsCompare = await BcryptService.compare(data.password, password);
  
      if (!passwordsCompare) {
        throw new Error('passwords not compare');
      }
  
      const token = await this.generateTokens({ ...accountData });
  
      return { token, account: accountData };
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  async signUp({ email, password, ...accountData }: AccountParams): Promise<SignInData> {
    try {
      const userWithThatEmail = await this.accountService.getOne({ where: { email } });

      if (userWithThatEmail) {
        throw new Error('user with that email already create');
      }

      const hashedPassword = await BcryptService.hash(password);

      const account = await this.accountService.create({ ...accountData, email, password: hashedPassword });

      const token = await this.generateTokens({ ...accountData, email });

      return { token, account };
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

}