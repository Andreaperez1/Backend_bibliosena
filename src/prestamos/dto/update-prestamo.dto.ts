import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoDto } from './create-prestamo.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePrestamoDto extends PartialType(CreatePrestamoDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}