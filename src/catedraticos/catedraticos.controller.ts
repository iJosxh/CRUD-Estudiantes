import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { CatedraticosService } from './catedraticos.service.js';
import { CreateCatedraticoDto } from './dto/create-catedratico.dto.js';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('catedraticos')
@UseGuards(JwtAuthGuard)
export class CatedraticosController {
  constructor(
    private readonly catedraticosService: CatedraticosService,
  ) {}

  @Post()
  create(
    @Body() createCatedraticoDto: CreateCatedraticoDto,
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