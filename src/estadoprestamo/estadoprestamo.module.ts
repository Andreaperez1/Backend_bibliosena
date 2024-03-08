import { Module } from '@nestjs/common';
import { EstadoprestamoService } from './estadoprestamo.service';
import { EstadoprestamoController } from './estadoprestamo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoPrestamo } from './entities/estadoprestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoPrestamo])],
  controllers: [EstadoprestamoController],
  providers: [EstadoprestamoService],
  exports:[TypeOrmModule]
})
export class EstadoprestamoModule {}
