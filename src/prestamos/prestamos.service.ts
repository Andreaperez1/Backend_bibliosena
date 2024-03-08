import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamos.entity';
import { In, Repository } from 'typeorm';
import { EquipoService } from 'src/equipo/equipo.service';
import { DetalleprestamoService } from 'src/detalleprestamo/detalleprestamo.service';
import { Equipo } from 'src/equipo/entities/Equipo.entity';
import { DetallePrestamo } from 'src/detalleprestamo/entities/detalleprestamo.entity';
import { CreateDetallePrestamoDto } from 'src/detalleprestamo/dto/create-detalleprestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { UpdateEstadoprestamoDto } from 'src/estadoprestamo/dto/update-estadoprestamo.dto';

@Injectable()
export class PrestamosService {

    ObtenerPrestamo() {
        throw new Error('Method not implemented.');
    }
    constructor(
        @Inject(EquipoService) private equipoService: EquipoService,
        @Inject(DetalleprestamoService) private detalleService: DetalleprestamoService,
        @InjectRepository(Prestamo)
        private PrestamoTabla: Repository<Prestamo>,
        @InjectRepository(DetallePrestamo) private detalleprestamoTabla: Repository<DetallePrestamo>
    ) { }

  
    // Codigo de Vanessa
    async crearPrestamo(prestamo: any) {
        try {
            let equiposPrestar = [];
            let contador: number = 0;
            console.log(prestamo.detalleprestamo)
            for (let equipo of prestamo.detalleprestamo) {
                const equiposBuenos = await this.equipoService.obtenerBuenos(equipo.id_tipo, 1);
                
                contador = 1;
                let responsePrestamo: any;
                for (let equipoB of equiposBuenos) {
                    if (contador <= parseInt(equipo.cantidad)) {
                       responsePrestamo = await this.detalleService.equipoOcupado({
                        id: equipoB.id, 
                        fecha_prestamo: prestamo.fecha_prestamo,
                        fecha_devolucion: prestamo.fecha_devolucion
                       });
                
                        if (responsePrestamo.length == 0) {
                            equiposPrestar.push(equipoB);
                            contador++;
                        }
                    } else {
                        break;
                    }
                }
            }
            if (equiposPrestar.length == 0) {
                return {
                    respuesta: "No hay ningun equipo disponible"
                }; // si entra aqui el codigo para
            }
            const responsePrestamo = await this.PrestamoTabla.insert(prestamo);
            const idPrestamo: number = responsePrestamo.identifiers[0].id;
            // Prestamos
            let respEquiposPrestados = [];
            for (let equipo of equiposPrestar) {
              
                let detalleprestamo = new CreateDetallePrestamoDto(idPrestamo, equipo.id, prestamo.fecha_prestamo, prestamo.fecha_devolucion)
                 respEquiposPrestados.push(await this.detalleprestamoTabla.insert(detalleprestamo));
            }
            const idEquiposDetalle = respEquiposPrestados.map((equipoPrestado: any) => {
                return equipoPrestado.identifiers[0].id;
            })
    
            //Devuelvo todos los equipos prestados 
            const equipos =  await this.detalleprestamoTabla.find({
                where: {
                    id: In(idEquiposDetalle)
                },
                relations: {
                    equipo: true,
                }
            });
            const respuestaFinal = {
                id: idPrestamo,
                equiposPrestar: equiposPrestar,
                ...equipos
            }
            return {
                respuesta: "Prestado",
                ...respuestaFinal
            };
        } catch(error) {
            console.log(error);
        }
    }
    async obtener() {
        return await this.PrestamoTabla.find();
    }

    async obtenerPorCedula(cedula) {
        return await this.PrestamoTabla.find({where:{cedula:cedula},relations:{id_estado:true, cedula:true, detalleprestamo:true}});
        /*return await this.PrestamoTabla.createQueryBuilder("prestamo")
            .innerJoinAndSelect("prestamo.cedula", "user")
            .innerJoinAndSelect("prestamo.id_estado", "id_estado")
            .where( { cedula: cedula })
            .getMany();}*/
    }
    async obtenerPorCedulaPrestamo(cedula) {
            return await this.PrestamoTabla.find({
                where: { cedula:cedula, id_estado: { id:2} },
                relations: { id_estado: true, cedula: true, detalleprestamo: true }
            });
        }
        




    async eliminarPrestamo(id: number) {
        const prestamoAEliminar = await this.PrestamoTabla.delete(id);
        if (!prestamoAEliminar) {
            throw new Error('El préstamo no existe.');
        }
        return this.PrestamoTabla.delete(id);
    }

    async actualizarPrestamo(id: number ,actualizarPrestamo:UpdateEstadoprestamoDto){
        return  await this.PrestamoTabla.update(id,{id_estado:{id:actualizarPrestamo.id}});
      }
}
