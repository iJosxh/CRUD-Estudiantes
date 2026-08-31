import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { CatalogosService } from './catalogos.service.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('catalogos')
@UseGuards(JwtAuthGuard)
export class CatalogosController {
  constructor(
    private readonly catalogosService:
      CatalogosService,
  ) {}

  @Get('niveles')
  findNiveles() {
    return this.catalogosService.findNiveles();
  }

  @Get('estados')
  findEstados() {
    return this.catalogosService.findEstados();
  }

  @Get('grados')
  findGrados() {
    return this.catalogosService.findGrados();
  }

  @Get('carreras')
  findCarreras() {
    return this.catalogosService.findCarreras();
  }

  @Get('roles')
  findRoles() {
    return this.catalogosService.findRoles();
  }
}