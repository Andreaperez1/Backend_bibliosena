import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Equipo } from './entities/Equipo.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) { }
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
  @Delete('/:id')
  eliminar(@Param('id') id: number) {
    return this.equipoService.eliminarEquipo(id);
  }
  @Put('/actualizar')
  actualizarEquipo(@Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equipoService.actualizarEquipo(updateEquipoDto);

  }
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


