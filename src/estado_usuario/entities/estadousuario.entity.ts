import {Entity,Column,PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "src/user/user.entity";

@Entity()
export class EstadoUsuario{
  @PrimaryGeneratedColumn()
  id:number;
  

  @Column()
  estado: string;
  
  @OneToMany(type => User, user => user.id_estado)
  user: User[]; 
 

}