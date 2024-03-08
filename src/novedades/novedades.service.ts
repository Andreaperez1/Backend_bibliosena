import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNovedadesDto} from 'src/novedades/dto/create-novedades.dto';
import { UpdateNovedadesDto} from 'src/novedades/dto/update-novedades.dto';
import { Prestamo } from 'src/prestamos/entities/prestamos.entity';
import { Repository } from 'typeorm';
import { Novedad } from './entities/novedades.entity';
import { EquipoService } from 'src/equipo/equipo.service';
import { Inject } from '@nestjs/common';
import { Equipo } from 'src/equipo/entities/Equipo.entity';

@Injectable()
export class NovedadesService {
    constructor(
      
        @InjectRepository(Novedad)
        private NovedadesTabla: Repository<Novedad>,
        @InjectRepository(Equipo)
        private EquipoTabla: Repository<Equipo>,
        @InjectRepository(Prestamo)
        private PrestamoTabla: Repository<Prestamo>
    ){}
    async Crear(novedad: CreateNovedadesDto){
        let Noexiste = await this.ValidarQueNoExista(novedad);
        if(Noexiste){
            console.log("actualizo el estado");
            await this.EquipoTabla.update(novedad.equipo,  {id_estado: novedad.estado});
             await this.NovedadesTabla.insert(novedad);
        }
        return 'Ya Existe'
    }
    async crearNovedades(novedades :CreateNovedadesDto[]){
        let resp  = await  this.PrestamoTabla.update(novedades[0].prestamo, {id_estado: novedades[0].estado_prestamo});
        novedades.forEach(async (novedad) => {
            await this.Crear(novedad);
        }) 
    }
    async ObtenerNovedad(){
        return await this.NovedadesTabla.find();
    }
    async ValidarQueNoExista(novedadN:CreateNovedadesDto){
        return await this.NovedadesTabla.findOne({where:{novedad:novedadN.novedad}}).then((resp)=>{
            if(resp==null){
                return true;
            }
            return false;
        })
    }
    async EliminarNovedad(id:number){
        return await this.NovedadesTabla.delete({id:id});
    }
    async ActualizarNovedad(Novedadesactualizar: UpdateNovedadesDto){
        return await this.NovedadesTabla.update(Novedadesactualizar.id,Novedadesactualizar)
    }
}
