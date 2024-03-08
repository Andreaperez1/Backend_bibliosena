import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import {EstadoprestamoModule} from './estadoprestamo/estadoprestamo.module' 
import { User } from './user/user.entity';
import { EstadoPrestamo } from './estadoprestamo/entities/estadoprestamo.entity';
import { EstadoEquipoModule } from './estado-equipo/estado-equipo.module';
import { EstadoEquipo } from './estado-equipo/entities/estado-equipo.entity';
import { tipoequipoModule } from './tipoequipo/tipoequipo.module';
import { RolesModule } from './roles/roles.module';
import { Rol } from './roles/entities/Roles.entity';
import { EquipoModule } from './equipo/equipo.module';

import { NovedadesModule } from './novedades/novedades.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { TipoEquipo } from './tipoequipo/entities/Tipo-Equipo.entity';
import { Equipo} from './equipo/entities/Equipo.entity';

import { Novedad } from './novedades/entities/novedades.entity';
import { Prestamo } from './prestamos/entities/prestamos.entity';
import { EstadoUsuarioModule } from './estado_usuario/estado_usuario.module';
import { EstadoUsuario } from './estado_usuario/entities/estadousuario.entity';
import { DetalleprestamoModule } from './detalleprestamo/detalleprestamo.module';
import 'dotenv/config';
import { DetallePrestamo } from './detalleprestamo/entities/detalleprestamo.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port:parseInt( process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: [User,EstadoPrestamo,EstadoEquipo,TipoEquipo,Rol,Equipo,Novedad,Prestamo,EstadoUsuario,DetallePrestamo],
      synchronize: false,
      /* ssl: {
        rejectUnauthorized: false
      }, */
      autoLoadEntities: true,
      
        }),
        AuthModule,
    UserModule,EstadoprestamoModule, EstadoEquipoModule, tipoequipoModule, RolesModule, EquipoModule, NovedadesModule, PrestamosModule, EstadoUsuarioModule, DetalleprestamoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
