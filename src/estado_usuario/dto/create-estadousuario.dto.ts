import {  IsNotEmpty, IsString } from 'class-validator';


export class CreateEstadoUsuarioDto {
    @IsString()
    @IsNotEmpty()
    estado : string;
  
  }