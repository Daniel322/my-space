import { Model, Optional } from "sequelize";

export type AccountParams = Omit<any, string> & Optional<any, string> & Optional<any, string> | undefined & {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type IAccount = Model &  {
  id: string;
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}