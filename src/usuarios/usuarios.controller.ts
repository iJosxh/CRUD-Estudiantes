import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsuariosService } from './usuarios.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';

import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get('disponibles-estudiantes')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Administrador')
    findDisponiblesParaEstudiante() {
      return this.usuariosService
        .findDisponiblesParaEstudiante();
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

}