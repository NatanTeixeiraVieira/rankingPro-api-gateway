import { IsString, IsNotEmpty, IsInt, Min } from '@/infra/libs/validation';

export class EventDto {
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
