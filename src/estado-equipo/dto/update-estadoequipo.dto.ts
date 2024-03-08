import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoEquipoDto } from './create-estadoequipo.dto';
import { IsNotEmpty,IsInt } from 'class-validator';

export class UpdateEstadoEquipoDto extends PartialType(CreateEstadoEquipoDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}
