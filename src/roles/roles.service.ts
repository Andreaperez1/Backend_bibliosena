import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/Roles.entity';
import { Repository } from 'typeorm';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';

@Injectable()
export class RolesService {constructor(
    @InjectRepository(Rol)
    private RolesTabla: Repository<Rol>
  ) { }

  async crearRoles(CreateRolesDto: CreateRolesDto) {
    let Noexiste = await this.validarNOQueExista(CreateRolesDto);
    if (Noexiste) {
      return await this.RolesTabla.insert(CreateRolesDto);
    }
    return 'Ya existe';

  }

  async obtenerRoles() {
    return await this.RolesTabla.find();
  }


  async validarNOQueExista(descripcionR: CreateRolesDto) {
    return await this.RolesTabla.findOne({ where: { descripcion: descripcionR.descripcion } }).then((resp) => {
      if (resp == null) {
        return true;
      }
      return false;
    });
  }
  async eliminarRoles(id : number){
    return await this.RolesTabla.delete({id: id});
  }
  async autualizarRoles(Rolesactualizar :UpdateRolesDto){
    return  await this.RolesTabla.update( Rolesactualizar.id_rol,Rolesactualizar);
  }}
