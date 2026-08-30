import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Estudiante } from './estudiante.entity.js';
import { EstudiantesService } from './estudiantes.service.js';
import { EstudiantesController } from './estudiantes.controller.js';

import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante]),
    AuthModule,
  ],

  controllers: [EstudiantesController],

  providers: [EstudiantesService],
})
export class EstudiantesModule {}
