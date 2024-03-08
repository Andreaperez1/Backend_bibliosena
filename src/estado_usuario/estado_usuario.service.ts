import { Injectable } from '@nestjs/common';
import { EstadoUsuario } from './entities/estadousuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadoUsuarioDto } from './dto/create-estadousuario.dto';
import { UpdateEstadoEquipoDto } from 'src/estado-equipo/dto/update-estadoequipo.dto';

@Injectable()
export class EstadoUsuarioService {
  constructor(
    @InjectRepository(EstadoUsuario)
    private estadousuarioTabla: Repository<EstadoUsuario>
  ) { }

  async crear(CreateEstadoUsuarioDto: CreateEstadoUsuarioDto) {
    let Noexiste = await this.validarNOQueExista(CreateEstadoUsuarioDto);
    if (Noexiste) {
      return await this.estadousuarioTabla.insert(CreateEstadoUsuarioDto);
    }
    return 'Ya existe';

  }

  async obtener() {
    return await this.estadousuarioTabla.find();
  }


  async validarNOQueExista(estadoE: CreateEstadoUsuarioDto) {
    return await this.estadousuarioTabla.findOne({ where: { estado: estadoE.estado } }).then((resp) => {
      if (resp == null) {
        return true;
      }
      return false;
    });
  }
  async eliminarestado(id : number){
    return await this.estadousuarioTabla.delete({id: id});
  }
  async actualizarestado(estadoactualizar : UpdateEstadoEquipoDto){
    return  await this.estadousuarioTabla.update( estadoactualizar.id,estadoactualizar);
  }
}
