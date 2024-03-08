import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty,IsInt } from 'class-validator';
import { CreateEstadoUsuarioDto } from './create-estadousuario.dto';

export class UpdateEstadoUsuarioDto extends PartialType(CreateEstadoUsuarioDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}
