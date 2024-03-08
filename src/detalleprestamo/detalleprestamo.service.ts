import { Injectable } from '@nestjs/common';
import { CreateDetallePrestamoDto, fechaValidacion } from './dto/create-detalleprestamo.dto';
import { DetallePrestamo } from './entities/detalleprestamo.entity';
import {
  Between,
  DataSource,
  Equal,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from 'src/prestamos/entities/prestamos.entity';

@Injectable()
export class DetalleprestamoService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(DetallePrestamo)
    private detalleprestamoTabla: Repository<DetallePrestamo>,
    @InjectRepository(Prestamo) private prestamoTabla:Repository<Prestamo>
  ) {}
  async crearPrestamo(detalleprestamo: CreateDetallePrestamoDto) {
    return await this.detalleprestamoTabla.insert(detalleprestamo);
  }

  async obtener(id_equipo, fecha_prestamo, fecha_devolucion) {
    console.log('ob', id_equipo, fecha_prestamo, fecha_devolucion);
    const r = await this.dataSource.getRepository(DetallePrestamo).findBy({
      fecha_prestamo: LessThanOrEqual(fecha_devolucion),
      fecha_devolucion: MoreThanOrEqual(fecha_prestamo),
      equipo: { id: Equal(id_equipo) },
    });
    return r;
  }

  async equipoOcupado(data: fechaValidacion) {
    const r = await this.dataSource.getRepository(DetallePrestamo).find({
      where: [
        {
          fecha_prestamo: MoreThanOrEqual(data.fecha_prestamo),
          fecha_devolucion: LessThanOrEqual(data.fecha_devolucion),
          equipo: { id:data.id },
        },
        {
          fecha_devolucion: Between(data.fecha_prestamo, data.fecha_devolucion),
          equipo: { id:data.id },
        },
        {
          fecha_prestamo: Between(data.fecha_prestamo, data.fecha_devolucion),
          equipo: { id:data.id },
        },
      ],
    });
    return r;
  }

  async obtenerTodo() {
    return await this.detalleprestamoTabla.find({
      relations: { equipo: true, prestamo: true },
    });
  }
  async obtenerPorId(id) {
    return await this.detalleprestamoTabla.find({where:{prestamo:{id:id}}})
     /* .createQueryBuilder('detalle')
      .innerJoinAndSelect('detalle.equipo', 'equipo')
      .where('detalle.prestamo = :id', { id: id })
      .getMany();*/
  }

  async eliminarPrestamo(id: number) {
    const Eliminar = await this.detalleprestamoTabla.delete(id);
    if (!Eliminar) {
      throw await Error('el prestamo no existe');
    }
    return this.detalleprestamoTabla.delete(id);
  }
}
