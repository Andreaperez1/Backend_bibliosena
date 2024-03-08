import { PartialType } from '@nestjs/mapped-types';
import { CreateNovedadesDto  } from './create-novedades.dto';
import { IsInt,IsNotEmpty } from 'class-validator';

export class UpdateNovedadesDto extends PartialType(CreateNovedadesDto ) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}
