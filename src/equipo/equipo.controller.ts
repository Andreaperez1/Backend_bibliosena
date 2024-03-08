import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Equipo } from './entities/Equipo.entity';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}
   @Post('/crear')
  crear(@Body() equipoDto: EquipoDto) {
    return this.equipoService.crearEquipo(equipoDto);
  }

  @Get()
  obtenerDatos() {
    return this.equipoService.obtenerEquipo();
  }
  
  @Get('/Estado')
  async obtenerEstadoPorTipo(): Promise<Equipo[]> {
    return this.equipoService.obtenerEstado() ;
  } 
  @Delete('/:id')
  eliminar(@Param('id') id: number) {
    return this.equipoService.eliminarEquipo(id);
  }
  @Put('/actualizar') 
    actualizarEquipo(@Body() updateEquipoDto: UpdateEquipoDto){
      return this.equipoService.actualizarEquipo(updateEquipoDto);

  } 
}
