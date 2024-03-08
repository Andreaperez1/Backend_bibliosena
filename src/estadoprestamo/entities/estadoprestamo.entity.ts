import { Prestamo } from "src/prestamos/entities/prestamos.entity";
import { Entity,Column,PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class EstadoPrestamo {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    estado:string;


    @OneToMany(()=>Prestamo,(prestamo)=>prestamo.id_estado)
    prestamo:Prestamo[];

}
