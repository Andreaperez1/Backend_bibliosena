import {  IsArray, IsDate, IsDateString, IsInt, IsNotEmpty, IsString,  } from "class-validator";

export class CreatePrestamoDto{

    @IsDateString()
    @IsNotEmpty()
    fecha_prestamo: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_devolucion: string;

    @IsInt()
    @IsNotEmpty()
    cedula: number;

    @IsInt()
    @IsNotEmpty()
    id_estado :number;
    
    @IsArray()
    @IsNotEmpty()
    detalleprestamo :[

    ];
}     