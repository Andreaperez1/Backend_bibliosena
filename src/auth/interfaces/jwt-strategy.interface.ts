import { Rol } from "src/roles/entities/Roles.entity";

export interface JwtPayload {
  readonly cedula: number;
  readonly contrasena: string;
  readonly id_rol: string;
}
