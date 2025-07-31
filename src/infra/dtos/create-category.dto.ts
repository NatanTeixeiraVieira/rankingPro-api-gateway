import { Event } from './event.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Type,
  ValidateNested,
} from '@/infra/libs/validation';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Event)
  readonly events: Event[];
}
