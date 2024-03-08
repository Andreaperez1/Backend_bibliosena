
import { Equipo } from "src/equipo/entities/Equipo.entity";
import { Novedad } from "src/novedades/entities/novedades.entity";
import { Entity,Column,PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class EstadoEquipo {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    estado:string;

    @OneToMany(type => Equipo,equipo  => equipo.id_estado)
    equipo: Equipo[];
    

  

  

}