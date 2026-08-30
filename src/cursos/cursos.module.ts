import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Curso } from './curso.entity.js';
import { CursosService } from './cursos.service.js';
import { CursosController } from './cursos.controller.js';

import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';
import { Catedratico } from '../catedraticos/catedratico.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Curso,
      CatalogoDetalle,
      Catedratico,
    ]),
    AuthModule,
  ],

  controllers: [
    CursosController,
  ],

  providers: [
    CursosService,
  ],
})
export class CursosModule {}