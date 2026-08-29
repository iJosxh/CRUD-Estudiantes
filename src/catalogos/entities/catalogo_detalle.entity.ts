import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Catalogo } from './catalogo.entity.js';
import { Catalogo as CatalogoEntity } from './catalogo.entity.js';
import { Usuario } from '../../usuarios/usuario.entity.js';
import { Catedratico } from '../../catedraticos/catedratico.entity.js';
import { Estudiante } from '../../estudiantes/estudiante.entity.js';
import { Curso } from '../../cursos/curso.entity.js';

import type { Relation } from 'typeorm';

@Entity()
export class CatalogoDetalle {
  @PrimaryGeneratedColumn()
  idCatalogoDetalle: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.detalles,)
  @JoinColumn({ name: 'idCatalogo' })
  catalogo: Relation<Catalogo>;

  @OneToMany(() => Usuario, (usuario) => usuario.rol,)
  usuariosConRol: Usuario[];

  @OneToMany(() => Usuario, (usuario) => usuario.estado,)
  usuariosConEstado: Usuario[];

  @OneToMany(() => Catedratico, (catedratico) => catedratico.estado,)
  catedraticosConEstado: Catedratico[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.nivel,)
  nivelEstudiantes: Estudiante[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.estado,)
  estudiantesConEstado: Estudiante[];

  @OneToMany(() => Curso, (curso) => curso.nivel,)
  cursosPorNivel: Curso[];

  @OneToMany(() => Curso, (curso) => curso.grado,)
  cursosPorGrado: Curso[];

  @OneToMany(() => Curso, (curso) => curso.carrera,)
  cursosPorCarrera: Curso[];

  @OneToMany(() => Curso, (curso) => curso.estado,)
  cursosPorEstado: Curso[];
}