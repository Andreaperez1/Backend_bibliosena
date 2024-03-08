import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from "./roles.service";
import { CreateRolesDto } from "./dto/create-roles.dto";
import { UpdateRolesDto } from './dto/update-roles.dto';

@Controller('rol')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Post('/crear')
  crearRoles(@Body()CreateRolesDto: CreateRolesDto){
    return this.rolesService.crearRoles(CreateRolesDto);
  }
  @Get('')
  obtenerRoles(){
    return this.rolesService.obtenerRoles();
  }
  @Delete('/:id')
  eliminarRoles(@Param('id') id: number){
    return this.rolesService.eliminarRoles(id);
  }
  @Put('/actualizar')
  actualizarRoles(@Body() UpdateRolesDto: UpdateRolesDto){
    return this.rolesService.autualizarRoles(UpdateRolesDto);
  }
}
