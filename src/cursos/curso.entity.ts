import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';
import { CatalogoDetalle as CatalogoDetalleEntity } from '../catalogos/entities/catalogo_detalle.entity.js';
import { Catedratico } from '../catedraticos/catedratico.entity.js';
import { CursoAsignado } from '../asignaciones/curso-asignado.entity.js';

import type { Relation } from 'typeorm';

@Entity('Curso')
export class Curso {
  @PrimaryGeneratedColumn()
  idCurso: number;

  @Column('varchar', { length: 10 })
  nombreCurso: string;

  @ManyToOne(
    () => CatalogoDetalleEntity,
    (catalogoDetalle) => catalogoDetalle.cursosPorNivel,
  )
  @JoinColumn({ name: 'idNivel' })
  nivel: Relation<CatalogoDetalle>;

  @ManyToOne(
    () => CatalogoDetalleEntity,
    (catalogoDetalle) => catalogoDetalle.cursosPorGrado,
  )
  @JoinColumn({ name: 'idGrado' })
  grado: Relation<CatalogoDetalle>;

  @ManyToOne(
    () => CatalogoDetalleEntity,
    (catalogoDetalle) => catalogoDetalle.cursosPorCarrera,
  )
  @JoinColumn({ name: 'idCarrera' })
  carrera: Relation<CatalogoDetalle>;

  @ManyToOne(
    () => CatalogoDetalleEntity,
    (catalogoDetalle) => catalogoDetalle.cursosPorEstado,
  )
  @JoinColumn({ name: 'idEstado' })
  estado: Relation<CatalogoDetalle>;

  @ManyToOne(
    () => Catedratico,
    (catedratico) => catedratico.cursos,
  )
  @JoinColumn({ name: 'idCatedratico' })
  catedratico: Relation<Catedratico>;

  @OneToMany(
    () => CursoAsignado,
    (cursoAsignado) => cursoAsignado.curso,
  )
  cursoAsignado: Relation<CursoAsignado[]>;
}