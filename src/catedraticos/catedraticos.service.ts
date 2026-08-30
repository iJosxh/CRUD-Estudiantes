import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Catedratico } from './catedratico.entity.js';
import { CreateCatedraticoDto } from './dto/create-catedratico.dto.js';
import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';

@Injectable()
export class CatedraticosService {
  constructor(
    @InjectRepository(Catedratico)
    private readonly catedraticoRepository:
      Repository<Catedratico>,

    @InjectRepository(CatalogoDetalle)
    private readonly catalogoDetalleRepository:
      Repository<CatalogoDetalle>,
  ) {}

  async create(
    createCatedraticoDto: CreateCatedraticoDto,
  ) {

    const estado =
      await this.catalogoDetalleRepository.findOne({
        where: {
          idCatalogoDetalle:
            createCatedraticoDto.idEstado,
        },
      });

    if (!estado) {
      throw new NotFoundException(
        `No existe el estado con id ${createCatedraticoDto.idEstado}`,
      );
    }

    const catedratico =
      this.catedraticoRepository.create({
        nombre:
          createCatedraticoDto.nombre,

        apellido:
          createCatedraticoDto.apellido,
      });

    catedratico.estado = estado;

    const catedraticoGuardado =
      await this.catedraticoRepository.save(
        catedratico,
      );

    return await this.catedraticoRepository.findOne({
      where: {
        idCatedratico:
          catedraticoGuardado.idCatedratico,
      },

      relations: {
        estado: true,
      },
    });
  }

  async findAll() {
    return await this.catedraticoRepository.find({
      relations: {
        estado: true,
      },
    });
  }
}