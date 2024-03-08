import { Equipo } from "src/equipo/entities/Equipo.entity"
import {Prestamo} from "src/prestamos/entities/prestamos.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class DetallePrestamo{
    @PrimaryGeneratedColumn()
    id : number;
    
    @ManyToOne(()=>Equipo,(equipo)=>equipo.equipo,{
        eager: true
    })
    equipo : Equipo;

    @Column()
    fecha_prestamo : Date;

    @Column()
    fecha_devolucion : Date;

    @ManyToOne(()=>Prestamo,(prestamos)=>prestamos.detalleprestamo)
    prestamo:Prestamo;
}