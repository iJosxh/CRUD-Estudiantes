import { Body, Controller, Get, Post } from '@nestjs/common';

import { CursosService } from './cursos.service.js';
import { CreateCursoDto } from './dto/create-curso.dto.js';

@Controller('cursos')
export class CursosController {
  constructor(
    private readonly cursosService: CursosService,
  ) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }
}