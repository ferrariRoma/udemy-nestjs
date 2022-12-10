import { Expose } from 'class-transformer';

export class UserInterceptorDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
