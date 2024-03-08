import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/Equipo.entity';
import { Repository } from 'typeorm';
import { EquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';


@Injectable()
export class EquipoService {
        constructor(
            @InjectRepository(Equipo)
            private equipoTabla: Repository<Equipo>
        ) { }

    async crearEquipo(equipoDtoA) {
        let Noexiste = await this.validarQueNoExista(equipoDtoA);
        if (Noexiste) {
            
            return await this.equipoTabla.insert(equipoDtoA)
        }
        return 'Ya Existe'
    }
    async obtenerEquipo() {
        return await this.equipoTabla.find({relations: {id_estado: true, id_tipo: true }});
    }
    async obtenerEstado() {
      return await this.equipoTabla.find({where: {id_estado: {id:1 }}})
    }
    obtenerBuenos(tipo:number, estado:number){
        return this.equipoTabla.find({where:{id_tipo:{id:tipo}, id_estado:{id:1}},relations:{id_tipo:true, id_estado:true}});
    }
   
    async validarQueNoExista(serialE:EquipoDto) {
        return await this.equipoTabla.findOne({where: {serial:serialE.serial}, relations:  {id_estado: true, id_tipo: true } }).then((resp) =>{
            if(resp == null){
                return true;
            }
            return false;
        })
    }
    async eliminarEquipo(id: number){
        return await this.equipoTabla.delete({id : id});
    }
    async actualizarEquipo(equipoActualizar){
        return await this.equipoTabla.update(equipoActualizar.id,equipoActualizar);
    }
    

}
