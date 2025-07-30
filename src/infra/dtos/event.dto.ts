import { IsString, IsNotEmpty, IsInt, Min } from '@/infra/libs/validation';

export class Event {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly operation: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  readonly value: number;
}
