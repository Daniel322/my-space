import { Sequelize, Options } from "sequelize";
import { Account } from "./database/models/account.model";
export class Database {
  static instance: Sequelize;

  static async connect(options: Options) {
    this.instance = new Sequelize(options);
    console.log(this.instance.models);
    try {
      await this.instance.authenticate();

      this.defineModels();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw new Error(JSON.stringify(error));
    }
  }

  static defineModels() {
    Account.defineModel(this.instance);
  }
}