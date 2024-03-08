import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { DetalleprestamoService } from './detalleprestamo.service';
import { CreateDetallePrestamoDto } from './dto/create-detalleprestamo.dto';
import { UpdateDetallePrestamoDto } from './dto/update-detalleprestamo.dto';
import { AdminAuthGuard } from 'src/guard/admin.guard';



@Controller('detalle-prestamo')
export class DetalleprestamoController {
  constructor(private readonly detalleprestamoService: DetalleprestamoService) { }

 
  @Post('/crear')
  crear(@Body() createDetalleprestamoDto: CreateDetallePrestamoDto) {
    return this.detalleprestamoService.crearPrestamo(createDetalleprestamoDto);
  }
  
  @Get()
  obtener() {
    return this.detalleprestamoService.obtenerTodo();
  }

  @Get('obtener/:id')
  obtenerPorId(@Param('id') id: number) {
    return this.detalleprestamoService.obtenerPorId(id);
  }
  @Delete('/:id')
  eliminar(@Param('id') id: number) {
    return this.detalleprestamoService.eliminarPrestamo(id);
  }

}
