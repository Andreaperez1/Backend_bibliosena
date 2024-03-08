import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesDto } from './create-roles.dto';
import { IsInt,IsNotEmpty } from 'class-validator';

export class UpdateRolesDto extends PartialType(CreateRolesDto) {
    @IsInt()
    @IsNotEmpty()
    id_rol: number;
}