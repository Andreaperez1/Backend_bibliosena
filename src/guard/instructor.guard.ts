import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class  InstrucAuthGuard extends AuthGuard('jwt') {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      return super.canActivate(context);
    }
  
    handleRequest(err: any, userBd: any, info: any) {
      if (err || !userBd) {
        throw err || new UnauthorizedException();
      }
      const rolesAllow = ['Instructor'];
      
      if (!rolesAllow.includes(userBd[0].id_rol.descripcion)) {

        throw new UnauthorizedException(
          'El usuario no tiene los permisos necesarios',
        );
      }
      return userBd;
    }
  }