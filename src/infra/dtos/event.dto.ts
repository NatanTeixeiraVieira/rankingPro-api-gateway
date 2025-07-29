import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

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
