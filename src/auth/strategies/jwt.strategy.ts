import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-strategy.interface';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userTable: Repository<User>,
    @Inject(JwtService) private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(
    payload: JwtPayload,
  ): Promise<User | { access_token: string }> {
    const { cedula } = payload;
    const userBd = await this.userTable.find({ // remplaza por tus funciones de busqueda de usuario
      where: {
        cedula: cedula
      },
      relations: {
        id_rol: true
      }
    });
    if (userBd.length == 0) {
      throw new UnauthorizedException('El usuario no esta registrado');
    }
    const payloadZ = {
      sub: userBd[0].cedula,
      usuario: userBd[0].usuario,
    };
    return {
      ...userBd,
      access_token: await this.jwtService.signAsync(payloadZ),
    };
  }

  async loginJwt(payload: LoginDto): Promise<any> {
    const { cedula, contrasena } = payload;
    
    const userBd = await this.userTable
      .find({
        where: {
          cedula: cedula
        },
        relations: {
          id_rol: true
        },
        select: ["cedula","nombre", "apellido", "id_rol", "usuario", "correo", "telefono", "contrasena"]
        
      });
      
    if (userBd.length == 0) {
      throw new UnauthorizedException('El usuario no esta registrado');
    } else if (!bcrypt.compareSync(contrasena, userBd[0].contrasena)) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }
    const payloadZ = {
      cedula: userBd[0].cedula,
      rol: userBd[0].id_rol.descripcion
      
    };
    delete userBd[0].contrasena;
    const userReturn = {
      usuario: userBd[0].usuario,
      correo: userBd[0].correo,
      telefono: userBd[0].telefono,
      rol: userBd[0].id_rol.descripcion,
      cedula: userBd[0].cedula,
      nombre: `${userBd[0].nombre} ${userBd[0].apellido} `,
      access_token: await this.jwtService.signAsync(payloadZ),
    };
    return userReturn;
  }
}
