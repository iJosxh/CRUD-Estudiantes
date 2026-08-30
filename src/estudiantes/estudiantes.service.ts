import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Estudiante } from './estudiante.entity.js';
import { CreateEstudianteDto } from './dto/create-estudiante.dto.js';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto.js';

import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';
import { Usuario } from '../usuarios/usuario.entity.js';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    const estudiante = this.estudianteRepository.create({
      nombre: createEstudianteDto.nombre,
      apellido: createEstudianteDto.apellido,
      seccion: createEstudianteDto.seccion,
    });

    estudiante.nivel = {
      idCatalogoDetalle: createEstudianteDto.idNivel,
    } as CatalogoDetalle;

    estudiante.estado = {
      idCatalogoDetalle: createEstudianteDto.idEstado,
    } as CatalogoDetalle;

    estudiante.usuario = {
      idUsuario: createEstudianteDto.idUsuario,
    } as Usuario;

    const estudianteGuardado =
      await this.estudianteRepository.save(estudiante);

    return await this.estudianteRepository.findOne({
      where: {
        idEstudiante: estudianteGuardado.idEstudiante,
      },
      relations: {
        nivel: true,
        estado: true,
        usuario: true,
      },
    });
  }

  async findAll() {
    const estudiantes = await this.estudianteRepository.find({
      relations: {
        nivel: true,
        estado: true,
        usuario: true,
        estudianteAsignado: {
          curso: {
            nivel: true,
            grado: true,
            carrera: true,
            estado: true,
            catedratico: true,
          },
        },
      },
    });

    return estudiantes.map((estudiante) =>
      this.formatearEstudiante(estudiante),
    );
  }

  async findOne(id: number) {
    const estudiante = await this.estudianteRepository.findOne({
      where: {
        idEstudiante: id,
      },
      relations: {
        nivel: true,
        estado: true,
        usuario: true,
        estudianteAsignado: true,
      },
    });

    if (!estudiante) {
      throw new NotFoundException(
        `No existe el estudiante con id ${id}`,
      );
    }

    return estudiante;
  }

  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
  ) {
    const estudiante = await this.findOne(id);

    if (updateEstudianteDto.nombre !== undefined) {
      estudiante.nombre = updateEstudianteDto.nombre;
    }

    if (updateEstudianteDto.apellido !== undefined) {
      estudiante.apellido = updateEstudianteDto.apellido;
    }

    if (updateEstudianteDto.seccion !== undefined) {
      estudiante.seccion = updateEstudianteDto.seccion;
    }

    if (updateEstudianteDto.idNivel !== undefined) {
      estudiante.nivel = {
        idCatalogoDetalle: updateEstudianteDto.idNivel,
      } as CatalogoDetalle;
    }

    if (updateEstudianteDto.idEstado !== undefined) {
      estudiante.estado = {
        idCatalogoDetalle: updateEstudianteDto.idEstado,
      } as CatalogoDetalle;
    }

    if (updateEstudianteDto.idUsuario !== undefined) {
      estudiante.usuario = {
        idUsuario: updateEstudianteDto.idUsuario,
      } as Usuario;
    }

    await this.estudianteRepository.save(estudiante);

    return this.findOne(id);
  }

  async remove(id: number) {
    const estudiante = await this.findOne(id);

    await this.estudianteRepository.remove(estudiante);

    return {
      idEstudiante: id,
      message: 'Estudiante eliminado correctamente',
    };
  }

  private formatearEstudiante(estudiante: Estudiante) {
    return {
      idEstudiante: estudiante.idEstudiante,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      seccion: estudiante.seccion,

      nivel: estudiante.nivel
        ? estudiante.nivel.nombre
        : null,

      estado: estudiante.estado
        ? estudiante.estado.nombre
        : null,

      usuario: estudiante.usuario
        ? {
            idUsuario: estudiante.usuario.idUsuario,
            username: estudiante.usuario.username,
          }
        : null,

      cursosAsignados: estudiante.estudianteAsignado
        ? estudiante.estudianteAsignado.map((asignacion) => ({
            idAsignacion: asignacion.idAsignacion,
            idCurso: asignacion.curso?.idCurso,
            nombreCurso: asignacion.curso?.nombreCurso,
            nivel: asignacion.curso?.nivel?.nombre,
            grado: asignacion.curso?.grado?.nombre,
            carrera: asignacion.curso?.carrera?.nombre,

            catedratico: asignacion.curso?.catedratico
              ? {
                  idCatedratico:
                    asignacion.curso.catedratico.idCatedratico,

                  nombre:
                    asignacion.curso.catedratico.nombre,

                  apellido:
                    asignacion.curso.catedratico.apellido,
                }
              : null,
          }))
        : [],
    };
  }
}