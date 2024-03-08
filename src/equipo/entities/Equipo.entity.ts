import { DetallePrestamo } from "src/detalleprestamo/entities/detalleprestamo.entity";
import { EstadoEquipo } from "src/estado-equipo/entities/estado-equipo.entity";
import { Novedad } from "src/novedades/entities/novedades.entity";
import { Prestamo } from "src/prestamos/entities/prestamos.entity";
import { TipoEquipo } from "src/tipoequipo/entities/Tipo-Equipo.entity";
import { Entity,Column,PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Equipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serial: string;

    @Column()
    descripcion: string;
    


    @ManyToOne(() => EstadoEquipo, Estadoequipo => Estadoequipo.equipo, {
        eager:true
    })
    @JoinColumn({ name: 'id_estado'})
    id_estado: EstadoEquipo;

    @ManyToOne(() => TipoEquipo, (tipoequipo) => tipoequipo.equipo,{
        eager: true
    })
    @JoinColumn({ name: 'id_tipo'})
    id_tipo: TipoEquipo[];

    @OneToMany(()=>DetallePrestamo,(detalleprestamo)=>detalleprestamo.equipo)
    equipo:Equipo[]; 
    

    @OneToMany(()=>Novedad,(devolucion)=>devolucion.equipo)
    devolucion:Novedad[];
   


}