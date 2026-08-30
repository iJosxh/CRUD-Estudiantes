import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { AsignacionesService } from './asignaciones.service.js';
import { CreateAsignacionDto } from './dto/create-asignacion.dto.js';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('asignaciones')
@UseGuards(JwtAuthGuard)
export class AsignacionesController {
  constructor(
    private readonly asignacionesService: AsignacionesService,
  ) {}

  @Post()
  create(
    @Body() createAsignacionDto: CreateAsignacionDto,
  ) {
    return this.asignacionesService.create(
      createAsignacionDto,
    );
  }

  @Get('estudiante/:id')
  findByEstudiante(@Param('id') id: string) {
    return this.asignacionesService.findByEstudiante(+id);
  }

  @Get()
    findAll() {
    return this.asignacionesService.findAll();
  }
}