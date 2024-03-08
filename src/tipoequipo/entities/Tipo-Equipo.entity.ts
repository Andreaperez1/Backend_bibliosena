import { Equipo } from "src/equipo/entities/Equipo.entity";
import { Entity,Column,PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class TipoEquipo {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    tipo:string;
    
    @OneToMany(() => Equipo,(equipo)  => equipo.id_tipo)
    equipo: Equipo[];
   

}