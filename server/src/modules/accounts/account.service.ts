import { FindOptions, Model, ModelCtor } from "sequelize";
import { Account } from "./account.model";
import { AccountParams } from "./account.types";

export class AccoutnService {
  private model: ModelCtor<Model>;

  constructor(model: ModelCtor<Model>) {
    this.model = model;
  }

  async getList(options: FindOptions): Promise<Model<Account, Account>[] | undefined> {
    try {
      return this.model.findAll<Model<Account>>(options);
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  }
  
  async getByPk(id: string): Promise<Model<Account, Account> | null> {
    try {
      return this.model.findByPk<Model<Account>>(id);
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  }

  async create(data: AccountParams): Promise<Model<Account, Account> | null> {
    try {
      return this.model.create<Model<Account>>({ ...data });
    } catch (error) {
      console.error(error);
      throw new Error(JSON.stringify(error));
    }
  }
}