import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TipoequipoService } from './tipoequipo.service';
import { CreateTipoEquipoDto } from './dto/create-tipoEquipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipoEquipo.dto';

@Controller('tipo-equipo')
export class TipoequipoController {
  constructor(private readonly tipoequipoService: TipoequipoService) {}
  @Post('/crear')
  crearTipo(@Body() CreateTipoEquipoDto: CreateTipoEquipoDto) {
    return this.tipoequipoService.crearTipo(CreateTipoEquipoDto);
  }

  @Get('')
  obtenerTipo() {
    return this.tipoequipoService.obtenerTipo();
  }
  @Delete('/:id')
  eliminarTipo(@Param('id') id: number) {
    return this.tipoequipoService.eliminarTipo(id);
  }
  @Put('/actualizar') 
    actualizarTipo(@Body() UpdateTipoEquipoDto: UpdateTipoEquipoDto){
      return this.tipoequipoService.autualizarTipo(UpdateTipoEquipoDto);
  }
 
  
}
