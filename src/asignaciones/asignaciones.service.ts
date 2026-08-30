import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CursoAsignado } from './curso-asignado.entity.js';
import { CreateAsignacionDto } from './dto/create-asignacion.dto.js';
import { Estudiante } from '../estudiantes/estudiante.entity.js';
import { Curso } from '../cursos/curso.entity.js';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(CursoAsignado)
    private readonly asignacionRepository: Repository<CursoAsignado>,
  ) {}

  async create(createAsignacionDto: CreateAsignacionDto) {
    const asignacion = this.asignacionRepository.create();

    asignacion.estudiante = {
      idEstudiante: createAsignacionDto.idEstudiante,
    } as Estudiante;

    asignacion.curso = {
      idCurso: createAsignacionDto.idCurso,
    } as Curso;

    const asignacionGuardada =
        await this.asignacionRepository.save(asignacion);

        return await this.asignacionRepository.findOne({
        where: {
            idAsignacion: asignacionGuardada.idAsignacion,
        },
        relations: {
            estudiante: {
            nivel: true,
            estado: true,
            },
            curso: {
            nivel: true,
            grado: true,
            carrera: true,
            estado: true,
            catedratico: true,
            },
        },
    });
  }

  async findByEstudiante(idEstudiante: number) {
    return await this.asignacionRepository.find({
      where: {
        estudiante: {
          idEstudiante,
        },
      },
      relations: {
        estudiante: true,
        curso: {
          nivel: true,
          grado: true,
          carrera: true,
          estado: true,
          catedratico: true,
        },
      },
    });
  }

  async findAll() {
    return await this.asignacionRepository.find({
        relations: {
        estudiante: {
            nivel: true,
            estado: true,
        },
        curso: {
            nivel: true,
            grado: true,
            carrera: true,
            estado: true,
            catedratico: true,
        },
        },
    });
  }

  
}