import { Module } from '@nestjs/common';
import { EstadoUsuarioService } from './estado_usuario.service';
import { EstadoUsuarioController } from './estado_usuario.controller';
import { EstadoUsuario } from './entities/estadousuario.entity';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([EstadoUsuario, User])],
  controllers: [EstadoUsuarioController],
  providers: [EstadoUsuarioService]
})
export class EstadoUsuarioModule {}
