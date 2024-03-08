import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamo } from './entities/prestamos.entity';
import { UpdateEstadoprestamoDto } from 'src/estadoprestamo/dto/update-estadoprestamo.dto';

@Controller('prestamo')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}
  @Post('/crear')
  async crear(@Body() prestamocrear: CreatePrestamoDto) {
    return await this.prestamosService.crearPrestamo(prestamocrear);
  }

  @Get('')
  obtenerprestamo() {
    return this.prestamosService.obtener();
  }
  @Get('/obtenerPorCedula/:cedula')
    obtenerPorCedula(@Param('cedula') cedula:number ){
        return this.prestamosService.obtenerPorCedula(cedula);
  }
  @Get('/obtenerPorCedula/prestado/:cedula')
    obtenerPorcedulaPrestado(@Param('cedula') cedula:number ){
        return this.prestamosService.obtenerPorCedula(cedula);
  }

  @Delete('/:id')
  eliminar(@Param('id') id: number) {
    return this.prestamosService.eliminarPrestamo(id);
  }
  @Put('/actualizar/:id') 
    actualizarEstado (@Param('id') id: number, @Body() actualizarEstado: UpdateEstadoprestamoDto){
    return this.prestamosService.actualizarPrestamo(id,actualizarEstado)
  }
  
}
