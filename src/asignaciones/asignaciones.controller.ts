import {
  Body,
  Controller,
  Get,
  Param,
  Req,
  Post,
} from '@nestjs/common';

import type { Request } from 'express';

import { AsignacionesService } from './asignaciones.service.js';
import { CreateAsignacionDto } from './dto/create-asignacion.dto.js';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

interface UsuarioJwt {
  sub: number;
  username: string;
  rol: string;
}

@Controller('asignaciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AsignacionesController {
  constructor(
    private readonly asignacionesService: AsignacionesService,
  ) {}

  @Post()
  @Roles('Administrador')
  create(
    @Body() createAsignacionDto: CreateAsignacionDto,
  ) {
    return this.asignacionesService.create(
      createAsignacionDto,
    );
  }

  @Get('mis-cursos')
  @Roles('Estudiante')
  findMisCursos(
    @Req()
    request: Request & { user: UsuarioJwt },
  ) {
    return this.asignacionesService.findMisCursos(
      request.user.sub,
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