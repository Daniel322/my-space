import { FindOptions, Model, ModelCtor, ModelStatic, Optional } from "sequelize";
import { Account } from "./account.model";
import { AccountParams, IAccount } from "./account.types";
import { Service } from "../../service";

type AccountModel = Model<Account, Account>;
type PartialAccountParams = Partial<AccountParams>;

export class AccoutnService {
  private model: ModelStatic<Model>;
  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  // async getList(options: FindOptions): Promise<Model<IAccount, IAccount>[]> {
  //   try {
  //     const instance = await this.model.findAll<IAccount>({ ...options, raw: true });

  
  //     return instance;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error(JSON.stringify(error));
  //   }
  // }
  
  async getByPk(id: string): Promise<Model<Account, Account> | null> {
    try {
      return this.model.findByPk<Model<Account>>(id);
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  }

  async getOne(options: FindOptions): Promise<IAccount> {
    const instance = await this.model.findOne<Model<IAccount>>(options);
    if (!instance) {
      throw new Error('account not found');
    }

    const jsonAccount = instance.toJSON();

    return jsonAccount;
  }

  async create(data: AccountParams): Promise<IAccount> {
    try {
      const instance = await this.model.create({ ...data });
      return instance.toJSON();
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  }

  async update(id: string, data: PartialAccountParams): Promise<Model<Account, Account> | null> {
    const currentRow = await this.getByPk(id);

    if (!currentRow) {
      throw new Error('account not found');
    }

    currentRow.set({ ...data });

    await currentRow.save();

    return currentRow;
  }

  async delete(id: string): Promise<boolean> {
    const currentAccount = await this.getByPk(id);
    if (currentAccount) {
      await currentAccount.destroy();

      return true;
    }

    throw new Error('account not found');
  }
}