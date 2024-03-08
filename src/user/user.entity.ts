import { type } from 'os';
import { EstadoUsuario } from 'src/estado_usuario/entities/estadousuario.entity';
import { Prestamo } from 'src/prestamos/entities/prestamos.entity';
import { Rol } from 'src/roles/entities/Roles.entity';
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class User {

    @PrimaryColumn()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    correo: string;

    @Column({type: 'int'})
    telefono: number;

    @Column()
    usuario: string;

    @Column('text',{
        select: false
    })
    contrasena: string;
    
     isActive:boolean;

    @ManyToOne(type => Rol, roles => roles.user)
    @JoinColumn({ name: 'id_rol'})
    id_rol: Rol;
    
    @ManyToOne( type => EstadoUsuario, estadousuario => estadousuario.user)
    @JoinColumn({ name: 'id_estado'})
    id_estado: EstadoUsuario;
    
    @OneToMany(type =>  Prestamo, prestamo => prestamo.cedula)
    prestamos: Prestamo[];
    prestamo: any;
   



}
