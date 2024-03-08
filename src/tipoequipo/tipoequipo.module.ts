import { Module } from '@nestjs/common';
import { TipoequipoService } from './tipoequipo.service';
import { TipoequipoController } from './tipoequipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEquipo } from './entities/Tipo-Equipo.entity';
import { Equipo } from 'src/equipo/entities/Equipo.entity';


@Module({
  imports : [TypeOrmModule.forFeature([TipoEquipo,Equipo])],
  controllers: [TipoequipoController],
  providers: [TipoequipoService],
  exports : [TypeOrmModule]
})

export class tipoequipoModule {}
