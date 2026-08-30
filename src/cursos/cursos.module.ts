import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Curso } from './curso.entity.js';
import { CursosService } from './cursos.service.js';
import { CursosController } from './cursos.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
  ],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}