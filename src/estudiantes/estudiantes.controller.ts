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

import { EstudiantesService } from './estudiantes.service.js';

import { CreateEstudianteDto } from './dto/create-estudiante.dto.js';

import { UpdateEstudianteDto } from './dto/update-estudiante.dto.js';

@Controller('estudiantes')
@UseGuards(JwtAuthGuard)
export class EstudiantesController {
  constructor(
    private readonly estudiantesService: EstudiantesService,
  ) {}

  // =========================
  // POST /estudiantes
  // =========================

  @Post()
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
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.estudiantesService.remove(id);
  }
}