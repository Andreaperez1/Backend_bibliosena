import { Body, Injectable } from '@nestjs/common';
import { CreateEstadoprestamoDto } from './dto/create-estadoprestamo.dto';
import { UpdateEstadoprestamoDto } from './dto/update-estadoprestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoPrestamo } from './entities/estadoprestamo.entity';
@Injectable()
export class EstadoprestamoService {
  constructor(
    @InjectRepository(EstadoPrestamo)
    private estadoprestamoTabla:Repository<EstadoPrestamo>
  ){}

  async create(createEstadoprestamoDto: CreateEstadoprestamoDto) {
    let Noexiste = await this.validarNOQueExista(createEstadoprestamoDto);
    if (Noexiste) {
      return await this.estadoprestamoTabla.insert(createEstadoprestamoDto);
    }
    return 'Ya existe';
   
  }

  async obtener(){
    return await this.estadoprestamoTabla.find();
  }


  async validarNOQueExista(prestamo) {
    return await this.estadoprestamoTabla.findOne({where : {estado : prestamo.estado}}).then((resp) => {
      if (resp == null) {
        return true;
      }
      return false;
    });
  }
  async eliminarEstado(id : number){
    return await this.estadoprestamoTabla.delete({id: id});
  }

  async actualizarEstado(estadoactualizar:any){
    return  await this.estadoprestamoTabla.update( estadoactualizar.id,estadoactualizar);
  }


}
