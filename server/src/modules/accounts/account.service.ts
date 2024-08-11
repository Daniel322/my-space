import { FindOptions, Model, ModelCtor, ModelStatic, Optional } from "sequelize";
import { Account } from "./account.model";
import { AccountParams } from "./account.types";
import { Service } from "../../service";

type AccountModel = Model<Account, Account>;
type PartialAccountParams = Partial<AccountParams>;

export class AccoutnService extends Service {
  constructor(model: ModelStatic<Model>) {
    super(model)
  }

  async getList<Account extends {}>(options: FindOptions): Promise<Model<Account, Account>[]> {
    try {
      const result = await this.model.findAll(options);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  }
  
  async getByPk<Account extends {}>(id: string): Promise<Model<Account, Account> | null> {
    try {
      return this.model.findByPk<Model<Account>>(id);
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  }

  async create<Account extends {}, AccountParams>(data: AccountParams): Promise<Model<Account, Account> | null> {
    try {
      return this.model.create({ ...data });
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  }

  async update<Account extends {}, PartialAccountParams>(id: string, data: PartialAccountParams): Promise<Model<Account, Account> | null> {
    const currentRow = await this.getByPk<Account>(id);

    if (!currentRow) {
      throw new Error('account not found');
    }

    currentRow.set({ ...data });

    await currentRow.save();

    return currentRow;
  }

  async delete(id: string): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}