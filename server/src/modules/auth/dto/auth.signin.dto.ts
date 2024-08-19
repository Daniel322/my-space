import { Expose } from 'class-transformer';

export class SignUpDto {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  @Expose()
  password!: string;
}