import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEquipoDto } from './create-tipoEquipo.dto';
import { IsInt, IsNotEmpty } from 'class-validator';


export class UpdateTipoEquipoDto extends PartialType(CreateTipoEquipoDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}  
