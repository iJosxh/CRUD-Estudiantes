import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

import { EstudiantesService } from './estudiantes.service.js';

import { CreateEstudianteDto } from './dto/create-estudiante.dto.js';

import { UpdateEstudianteDto } from './dto/update-estudiante.dto.js';

@Controller('estudiantes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstudiantesController {
  constructor(
    private readonly estudiantesService: EstudiantesService,
  ) {}

  // =========================
  // POST /estudiantes
  // =========================

  @Post()
  @Roles('Administrador')
  create(
    @Body() createEstudianteDto: CreateEstudianteDto,
  ) {
    return this.estudiantesService.create(
      createEstudianteDto,
    );
  }

  // =========================
  // GET /estudiantes
  // =========================

  @Get()
  @Roles('Administrador')
  findAll() {
    return this.estudiantesService.findAll();
  }

  // =========================
  // GET /estudiantes/:id
  // =========================

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.estudiantesService.findOne(id);
  }

  // =========================
  // PATCH /estudiantes/:id
  // =========================

  @Patch(':id')
  @Roles('Administrador')
  update(
    @Param('id', ParseIntPipe) id: number,

    @Body()
    updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudiantesService.update(
      id,
      updateEstudianteDto,
    );
  }

  // =========================
  // DELETE /estudiantes/:id
  // =========================

  @Delete(':id')
  @Roles('Administrador')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.estudiantesService.remove(id);
  }
}