import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Equipo } from 'src/equipo/entities/Equipo.entity';
import { EstadoEquipo } from 'src/estado-equipo/entities/estado-equipo.entity';
import { EstadoPrestamo } from 'src/estadoprestamo/entities/estadoprestamo.entity';
import { Prestamo } from 'src/prestamos/entities/prestamos.entity';


export class CreateNovedadesDto {
    @IsString()
    @IsNotEmpty()
    novedad: string;

    @IsInt()
    @IsNotEmpty()
    prestamo: Prestamo;


    @IsInt()
    @IsNotEmpty() 
    equipo: Equipo;

    @IsInt()
    @IsNotEmpty()
    estado: EstadoEquipo;

    @IsInt()
    @IsNotEmpty()
    estado_prestamo: EstadoPrestamo;

}