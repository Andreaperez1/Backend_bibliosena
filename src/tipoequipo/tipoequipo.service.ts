import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoEquipo } from './entities/Tipo-Equipo.entity';
import { Repository } from 'typeorm';
import { CreateTipoEquipoDto } from './dto/create-tipoEquipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipoEquipo.dto';

@Injectable()
export class TipoequipoService {
    constructor(
        @InjectRepository(TipoEquipo)
        private TipoEquipoTabla: Repository<TipoEquipo>
      ) { }
    
      async crearTipo(CreateTipoEquipoDto: CreateTipoEquipoDto) {
        let Noexiste = await this.validarNOQueExista(CreateTipoEquipoDto);
        if (Noexiste) {
          return await this.TipoEquipoTabla.insert(CreateTipoEquipoDto);
        }
        return 'Ya existe';
    
      }
    
      async obtenerTipo() {
        return await this.TipoEquipoTabla.find();
      }
    
    
      async validarNOQueExista(tipoE: CreateTipoEquipoDto) {
        return await this.TipoEquipoTabla.findOne({ where: { tipo: tipoE.tipo } }).then((resp) => {
          if (resp == null) {
            return true;
          }
          return false;
        });
      }
      async eliminarTipo(id : number){
        return await this.TipoEquipoTabla.delete({id: id});
      }
      async autualizarTipo(tipoactualizar :UpdateTipoEquipoDto){
        return  await this.TipoEquipoTabla.update( tipoactualizar.id,tipoactualizar);
      }
}
