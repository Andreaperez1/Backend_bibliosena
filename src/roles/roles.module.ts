import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol} from './entities/Roles.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Rol,User])],
  controllers: [RolesController],
  providers: [RolesService],
  exports : [TypeOrmModule]
})
export class RolesModule {}
