import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallePrestamoDto } from './create-detalleprestamo.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateDetallePrestamoDto extends PartialType(CreateDetallePrestamoDto) {

    @IsInt()
    @IsNotEmpty()
    id : number
}
