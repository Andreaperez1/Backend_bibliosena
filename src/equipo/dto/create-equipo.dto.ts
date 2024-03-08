import { IsInt, IsNotEmpty, IsString } from 'class-validator';


export class EquipoDto{
   
    @IsString()
    @IsNotEmpty()
    serial: string; 

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsInt()
    @IsNotEmpty()
    id_estado: number;

    @IsInt()
    @IsNotEmpty()
    id_tipo: number;
}
   