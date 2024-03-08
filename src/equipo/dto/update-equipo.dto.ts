import { PartialType } from '@nestjs/mapped-types';
import { EquipoDto } from './create-equipo.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateEquipoDto extends PartialType(EquipoDto) {
    @IsInt()
    @IsNotEmpty()
    id :number;
}