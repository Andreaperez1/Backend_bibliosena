import { IsString,IsNotEmpty } from "class-validator";

export class CreateEstadoprestamoDto {
  @IsString()
  @IsNotEmpty()
  estado : string;

}



