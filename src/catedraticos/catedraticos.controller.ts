import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CatedraticosService } from './catedraticos.service.js';
import { CreateCatedraticoDto } from './dto/create-catedratico.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('catedraticos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CatedraticosController {

  constructor(
    private readonly catedraticosService:
      CatedraticosService,
  ) {}

  @Post()
  @Roles('Administrador')
  create(
    @Body()
    createCatedraticoDto:
      CreateCatedraticoDto,
  ) {
    return this.catedraticosService.create(
      createCatedraticoDto,
    );
  }

  @Get()
  findAll() {
    return this.catedraticosService.findAll();
  }
}