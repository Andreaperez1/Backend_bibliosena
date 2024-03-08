import { Module } from '@nestjs/common';
import { NovedadesService } from './novedades.service';
import { NovedadesController } from './novedades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novedad } from './entities/novedades.entity';
import { Prestamo } from 'src/prestamos/entities/prestamos.entity';
import { Equipo } from 'src/equipo/entities/Equipo.entity';
import { PrestamosService } from 'src/prestamos/prestamos.service';
import { EquipoService } from 'src/equipo/equipo.service';
import { PrestamosModule } from 'src/prestamos/prestamos.module';
import { EquipoModule } from 'src/equipo/equipo.module';
import { DetallePrestamo } from 'src/detalleprestamo/entities/detalleprestamo.entity';
import { DetalleprestamoModule } from 'src/detalleprestamo/detalleprestamo.module';
import { DetalleprestamoService } from 'src/detalleprestamo/detalleprestamo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Novedad,Prestamo,Equipo, DetallePrestamo]),PrestamosModule,EquipoModule, DetalleprestamoModule],
  controllers: [NovedadesController],
  providers: [NovedadesService, PrestamosService, EquipoService, DetalleprestamoService],
  exports:[TypeOrmModule]
})
export class NovedadesModule {}
