import { Optional } from "sequelize";

export type AccountParams = Omit<any, string> & Optional<any, string> & Optional<any, string> | undefined & {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};