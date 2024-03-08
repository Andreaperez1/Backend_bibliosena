import { Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/User.dto';
import { LoginDto } from './dto/login.dto';
import { BcryptService } from './Bcriypt.service';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private Usertabla: Repository<User>,
    private bcryptService : BcryptService
    ){}


   async CrearUser(userDto:UserDto){
    let Noexiste = await this.ValidarQueNoExista(userDto);
    if(Noexiste){
        userDto.contrasena = await this.bcryptService.hashcontrasena(userDto.contrasena);
        return await this.Usertabla.insert(userDto);
    }
    return 'Ya Existe';
   }

   async ObtenerUser(){
    return await this.Usertabla.find({relations: {id_rol: true, id_estado: true}});
   }
  

   async ValidarQueNoExista(UsuarioC:UserDto){
    return await this.Usertabla.findOne({ where: {cedula:UsuarioC.cedula}, relations: {id_rol: true, id_estado: true}}).then((resp) =>{
        if(resp == null){
            return true;
        }
        return false;
    });
   }
   async eliminarUser(cedula: number){
    return await this.Usertabla.delete({cedula:cedula});
   }
   async actualizarUser(UserActualizar:UserDto){
    return await this.Usertabla.update({cedula:UserActualizar.cedula},UserActualizar);
   }
}