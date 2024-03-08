import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamos.entity';
import { EstadoPrestamo } from 'src/estadoprestamo/entities/estadoprestamo.entity';
import { User } from 'src/user/user.entity';
import { DetallePrestamo } from 'src/detalleprestamo/entities/detalleprestamo.entity';
import { EquipoModule } from 'src/equipo/equipo.module';
import { DetalleprestamoModule } from 'src/detalleprestamo/detalleprestamo.module';
import { EquipoService } from 'src/equipo/equipo.service';
import { DetalleprestamoService } from 'src/detalleprestamo/detalleprestamo.service';
import { UserModule } from 'src/user/user.module';
import { EstadoprestamoModule } from 'src/estadoprestamo/estadoprestamo.module';

@Module({
  imports : [TypeOrmModule.forFeature([Prestamo,User,EstadoPrestamo,DetallePrestamo]),UserModule,EstadoprestamoModule,EquipoModule,DetalleprestamoModule],
  controllers: [PrestamosController],
  providers: [PrestamosService,EquipoService,DetalleprestamoService],
  exports : [TypeOrmModule]
})
export class PrestamosModule {}
