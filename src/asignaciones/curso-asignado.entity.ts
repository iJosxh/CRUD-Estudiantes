import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Estudiante } from '../estudiantes/estudiante.entity.js';
import { Curso } from '../cursos/curso.entity.js';

import type { Relation } from 'typeorm';

@Entity('CursoAsignado')
export class CursoAsignado {
  @PrimaryGeneratedColumn()
  idAsignacion: number;

  @ManyToOne(
    () => Estudiante,
    (estudiante) => estudiante.estudianteAsignado,
  )
  @JoinColumn({ name: 'idEstudiante' })
  estudiante: Relation<Estudiante>;

  @ManyToOne(
    () => Curso,
    (curso) => curso.cursoAsignado,
  )
  @JoinColumn({ name: 'idCurso' })
  curso: Relation<Curso>;
}