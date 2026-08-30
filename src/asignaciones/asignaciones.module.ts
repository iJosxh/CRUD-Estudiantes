import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CursoAsignado } from './curso-asignado.entity.js';
import { AsignacionesService } from './asignaciones.service.js';
import { AsignacionesController } from './asignaciones.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CursoAsignado,
    ]),
  ],
  controllers: [
    AsignacionesController,
  ],
  providers: [
    AsignacionesService,
  ],
})
export class AsignacionesModule {}