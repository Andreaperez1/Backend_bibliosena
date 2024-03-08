
import { Body, Injectable } from '@nestjs/common';
import { CreateEstadoEquipoDto } from './dto/create-estadoequipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estadoequipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEquipo } from './entities/estado-equipo.entity';

@Injectable()
export class EstadoEquipoService {
  constructor(
    @InjectRepository(EstadoEquipo)
    private estadoequipoTabla: Repository<EstadoEquipo>
  ) { }

  async crear(CreateEstadoEquipoDto: CreateEstadoEquipoDto) {
    let Noexiste = await this.validarNOQueExista(CreateEstadoEquipoDto);
    if (Noexiste) {
      return await this.estadoequipoTabla.insert(CreateEstadoEquipoDto);
    }
    return 'Ya existe';

  }

  async obtener() {
    return await this.estadoequipoTabla.find();
  }


  async validarNOQueExista(estadoE: CreateEstadoEquipoDto) {
    return await this.estadoequipoTabla.findOne({ where: { estado: estadoE.estado } }).then((resp) => {
      if (resp == null) {
        return true;
      }
      return false;
    });
  }
  async eliminarestado(id : number){
    return await this.estadoequipoTabla.delete({id: id});
  }
  async actualizarestado(estadoactualizar : UpdateEstadoEquipoDto){
    return  await this.estadoequipoTabla.update( estadoactualizar.id,estadoactualizar);
  }

}
