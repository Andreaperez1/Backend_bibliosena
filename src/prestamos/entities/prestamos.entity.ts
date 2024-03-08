
import { DetallePrestamo } from "src/detalleprestamo/entities/detalleprestamo.entity";
import { EstadoPrestamo } from "src/estadoprestamo/entities/estadoprestamo.entity";
import { Novedad } from "src/novedades/entities/novedades.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class  Prestamo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha_prestamo: Date;

    @Column()
    fecha_devolucion: Date;

    /*@Column()
    cantidad: number;*/


    @ManyToOne(() => User, (cedula) => cedula.prestamo,{
        eager:true
    })
    @JoinColumn({ name: 'cedula'}) 
    cedula: User[];

    @ManyToOne(()=> EstadoPrestamo, (estadoprestamo) => estadoprestamo.prestamo,{
        eager:true
    }) 
    id_estado: EstadoPrestamo;

    @OneToMany(()=>Novedad,(devolucion)=>devolucion.prestamo)
    devolucion:Novedad[];

    /*@ManyToOne(()=> Equipo, equipo => equipo.prestamo)
    @JoinColumn({name: 'id_equipo'})
    id_equipo: Equipo[];*/

    @OneToMany(()=>DetallePrestamo,(detalleprestamo)=>detalleprestamo.prestamo,{
        eager:true
    })
    detalleprestamo :DetallePrestamo; 
}