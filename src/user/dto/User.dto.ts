
import { IsNotEmpty, IsInt, IsString } from "class-validator";
import { EstadoUsuario } from "src/estado_usuario/entities/estadousuario.entity";
import { Rol } from "src/roles/entities/Roles.entity";

export class UserDto {

    @IsInt()
    @IsNotEmpty()
    cedula: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsNotEmpty()
    correo: string;

    @IsInt()
    @IsNotEmpty()
    telefono: number;

    @IsString()
    @IsNotEmpty()
    usuario: string;

    @IsString()
    @IsNotEmpty()
    contrasena: string;

    @IsInt()
    @IsNotEmpty()
    id_rol: Rol;

    @IsInt()
    @IsNotEmpty()
    id_estado: EstadoUsuario;

}