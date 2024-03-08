import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsInt()
    cedula: number;

    @IsNotEmpty()
    @IsString()
    contrasena: string;


}