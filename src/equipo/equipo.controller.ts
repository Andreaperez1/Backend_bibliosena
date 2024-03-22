import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Equipo } from './entities/Equipo.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminAuthGuard } from 'src/guard/admin.guard';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) { }
  @UseGuards(AdminAuthGuard)
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
    return this.equipoService.obtenerEstado();
  }
  @UseGuards(AdminAuthGuard)
  @Delete('/:id')
  eliminar(@Param('id') id: number) {
    return this.equipoService.eliminarEquipo(id);
  }
  @UseGuards(AdminAuthGuard)
  @Put('/actualizar')
  actualizarEquipo(@Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equipoService.actualizarEquipo(updateEquipoDto);

  }
  @UseGuards(AdminAuthGuard)
  @Post('/crearUpload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload', filename: (req, file, cb) => {
        const al = Date.now() + '-' + Math.round(Math.random() * 10);
        const extensionFile = file.originalname.split('.');
        cb(null,`${ file.fieldname }_${ al }.${ extensionFile[extensionFile.length - 1]}` );
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.equipoService.subirMasivo(file);
  }
}


