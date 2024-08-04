import { Sequelize, Options } from "sequelize";

export class Database {
  static instance: Sequelize;

  static async connect(options: Options) {
    this.instance = new Sequelize(options);

    try {
      await this.instance.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw new Error(JSON.stringify(error));
    }
  }
}