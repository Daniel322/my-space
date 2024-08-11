import { FindOptions, Model, ModelStatic } from "sequelize";

export abstract class Service {
  readonly model: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  public abstract getList<T extends {}>(options: FindOptions): Promise<Model<T, T>[] | undefined>;

  public abstract getByPk<T extends {}>(id: string): Promise<Model<T, T> | null>;

  public abstract create<T extends {}, W extends {}>(data: W): Promise<Model<T, T> | null>;

  public abstract update<T extends {}, W>(id: string, data: W): Promise<Model<T, T> | null>;

  public abstract delete(id: string): Promise<number>
}