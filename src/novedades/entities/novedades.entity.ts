import { Equipo } from "src/equipo/entities/Equipo.entity";
import { EstadoEquipo } from "src/estado-equipo/entities/estado-equipo.entity";
import { Prestamo } from "src/prestamos/entities/prestamos.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Novedad {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    novedad : string;

    @ManyToOne(()=> Prestamo, (prestamo)=> prestamo.devolucion,{
        eager: true
    } )
    prestamo : Prestamo;

    @ManyToOne(()=> Equipo, (equipo) => equipo.devolucion,{
        eager: true
    })
    equipo: Equipo;








}
