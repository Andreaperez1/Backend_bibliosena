import {  IsNotEmpty, IsString } from 'class-validator';


export class CreateEstadoEquipoDto {
    @IsString()
    @IsNotEmpty()
    estado : string;
  
  }