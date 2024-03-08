import { User } from "src/user/user.entity";
import { Entity,Column,PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Rol{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    descripcion:string;
    
    @OneToMany(type => User, user => user.id_rol)
    user: User[]; 
   
}