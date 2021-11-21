import { IsString } from 'class-validator';

export class UpdateTuitDto {
  @IsString()
  readonly message: string;
}
