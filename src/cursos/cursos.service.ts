import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Curso } from './curso.entity.js';
import { CreateCursoDto } from './dto/create-curso.dto.js';
import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';
import { Catedratico } from '../catedraticos/catedratico.entity.js';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    const curso = this.cursoRepository.create({
      nombreCurso: createCursoDto.nombreCurso,
    });

    curso.nivel = {
      idCatalogoDetalle: createCursoDto.idNivel,
    } as CatalogoDetalle;

    curso.grado = {
      idCatalogoDetalle: createCursoDto.idGrado,
    } as CatalogoDetalle;

    curso.carrera = {
      idCatalogoDetalle: createCursoDto.idCarrera,
    } as CatalogoDetalle;

    curso.estado = {
      idCatalogoDetalle: createCursoDto.idEstado,
    } as CatalogoDetalle;

    curso.catedratico = {
      idCatedratico: createCursoDto.idCatedratico,
    } as Catedratico;

    const cursoGuardado = await this.cursoRepository.save(curso);

    return await this.cursoRepository.findOne({
        where: {
            idCurso: cursoGuardado.idCurso,
        },
        relations: {
            nivel: true,
            grado: true,
            carrera: true,
            estado: true,
            catedratico: true,
        },
    });
  }

  async findAll() {
    return await this.cursoRepository.find({
      relations: {
        nivel: true,
        grado: true,
        carrera: true,
        estado: true,
        catedratico: true,
      },
    });
  }
}