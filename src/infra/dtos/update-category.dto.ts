import {
  Type,
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from '@/infra/libs/validation';

import { EventDto } from './event.dto';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  events: EventDto[];
}
