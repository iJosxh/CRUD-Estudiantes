import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CursosService } from './cursos.service.js';
import { CreateCursoDto } from './dto/create-curso.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('cursos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CursosController {

  constructor(
    private readonly cursosService:
      CursosService,
  ) {}

  @Post()
  @Roles('Administrador')
  create(
    @Body()
    createCursoDto: CreateCursoDto,
  ) {
    return this.cursosService.create(
      createCursoDto,
    );
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }
}