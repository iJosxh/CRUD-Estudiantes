import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Catedratico } from './catedratico.entity.js';
import { CreateCatedraticoDto } from './dto/create-catedratico.dto.js';
import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';

@Injectable()
export class CatedraticosService {
  constructor(
    @InjectRepository(Catedratico)
    private readonly catedraticoRepository: Repository<Catedratico>,
  ) {}

  async create(createCatedraticoDto: CreateCatedraticoDto) {
    const catedratico = this.catedraticoRepository.create({
      nombre: createCatedraticoDto.nombre,
      apellido: createCatedraticoDto.apellido,
    });

    catedratico.estado = {
      idCatalogoDetalle: createCatedraticoDto.idEstado,
    } as CatalogoDetalle;

    return await this.catedraticoRepository.save(catedratico);
  }

  async findAll() {
    return await this.catedraticoRepository.find({
      relations: {
        estado: true,
      },
    });
  }
}