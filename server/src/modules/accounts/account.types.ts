import { Model, Optional } from "sequelize";

export type AccountParams = {
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