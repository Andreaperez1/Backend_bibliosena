import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EstadoprestamoService } from './estadoprestamo.service';
import { CreateEstadoprestamoDto } from './dto/create-estadoprestamo.dto';
import { UpdateEstadoprestamoDto } from './dto/update-estadoprestamo.dto';

@Controller('estado-prestamo')
export class EstadoprestamoController {
  constructor(private readonly estadoprestamoService: EstadoprestamoService) { }

  @Post('/crear')
  create(@Body() createEstadoprestamoDto: CreateEstadoprestamoDto) {
    return this.estadoprestamoService.create(createEstadoprestamoDto);
  }

  @Get('')
  obtenerdatos() {
    return this.estadoprestamoService.obtener();
  }
  @Delete('/:id')
  eliminar(@Param('id') id: number) {
    return this.estadoprestamoService.eliminarEstado(id);
  }
  @Put('/actualizar') 
    actualizarEstado(@Body() UpdateEstadoprestamoDto: UpdateEstadoprestamoDto){
    return this.estadoprestamoService.actualizarEstado(UpdateEstadoprestamoDto);
  }





}
