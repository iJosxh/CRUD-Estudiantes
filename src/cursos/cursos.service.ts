import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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

    @InjectRepository(CatalogoDetalle)
    private readonly catalogoDetalleRepository:
      Repository<CatalogoDetalle>,

    @InjectRepository(Catedratico)
    private readonly catedraticoRepository:
      Repository<Catedratico>,
  ) {}

  async create(createCursoDto: CreateCursoDto) {

    // =========================
    // VALIDAR NIVEL
    // =========================

    const nivel =
      await this.catalogoDetalleRepository.findOne({
        where: {
          idCatalogoDetalle: createCursoDto.idNivel,
        },
      });

    if (!nivel) {
      throw new NotFoundException(
        `No existe el nivel con id ${createCursoDto.idNivel}`,
      );
    }

    // =========================
    // VALIDAR GRADO
    // =========================

    const grado =
      await this.catalogoDetalleRepository.findOne({
        where: {
          idCatalogoDetalle: createCursoDto.idGrado,
        },
      });

    if (!grado) {
      throw new NotFoundException(
        `No existe el grado con id ${createCursoDto.idGrado}`,
      );
    }

    // =========================
    // VALIDAR ESTADO
    // =========================

    const estado =
      await this.catalogoDetalleRepository.findOne({
        where: {
          idCatalogoDetalle: createCursoDto.idEstado,
        },
      });

    if (!estado) {
      throw new NotFoundException(
        `No existe el estado con id ${createCursoDto.idEstado}`,
      );
    }

    // =========================
    // VALIDAR CATEDRÁTICO
    // =========================

    const catedratico =
      await this.catedraticoRepository.findOne({
        where: {
          idCatedratico:
            createCursoDto.idCatedratico,
        },
      });

    if (!catedratico) {
      throw new NotFoundException(
        `No existe el catedrático con id ${createCursoDto.idCatedratico}`,
      );
    }

    // =========================
    // VALIDAR CARRERA
    // =========================

    let carrera: CatalogoDetalle | null = null;

    if (createCursoDto.idCarrera != null) {
      carrera =
        await this.catalogoDetalleRepository.findOne({
          where: {
            idCatalogoDetalle:
              createCursoDto.idCarrera,
          },
        });

      if (!carrera) {
        throw new NotFoundException(
          `No existe la carrera con id ${createCursoDto.idCarrera}`,
        );
      }
    }

    // =========================
    // CREAR CURSO
    // =========================

    const curso = this.cursoRepository.create({
      nombreCurso: createCursoDto.nombreCurso,
    });

    curso.nivel = nivel;
    curso.grado = grado;
    curso.estado = estado;
    curso.catedratico = catedratico;

    if (carrera) {
      curso.carrera = carrera;
    }

    const cursoGuardado =
      await this.cursoRepository.save(curso);

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