import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoprestamoDto } from './create-estadoprestamo.dto';
import { IsInt, isInt,IsNotEmpty } from 'class-validator';

export class UpdateEstadoprestamoDto extends PartialType(CreateEstadoprestamoDto) {
    @IsInt()
    @IsNotEmpty()
    id: number;
}
