import { Module } from '@nestjs/common';
import { EstadoEquipoService } from './estado-equipo.service';
import { EstadoEquipoController } from './estado-equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEquipo } from './entities/estado-equipo.entity';
import { Equipo } from 'src/equipo/entities/Equipo.entity';

@Module({
  imports : [TypeOrmModule.forFeature([EstadoEquipo, Equipo])],
  controllers: [EstadoEquipoController],
  providers: [EstadoEquipoService],
  exports : [TypeOrmModule]
})
export class EstadoEquipoModule {}
