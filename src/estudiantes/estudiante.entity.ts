import { Column, Entity, OneToOne, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';
import { CatalogoDetalle as CatalogoDetalleEntity } from '../catalogos/entities/catalogo_detalle.entity.js';
import { Usuario } from '../usuarios/usuario.entity.js';
import { Usuario as UsuarioEntity } from '../usuarios/usuario.entity.js';
import { CursoAsignado } from '../asignaciones/curso-asignado.entity.js';

import type { Relation } from 'typeorm';

@Entity()
export class Estudiante{
    @PrimaryGeneratedColumn()
    idEstudiante: number

    @Column('varchar', {length: 50})
    nombre: string

    @Column('varchar', {length: 50})
    apellido: string

    @ManyToOne(() => CatalogoDetalleEntity, (catalogoDetalle) => catalogoDetalle.nivelEstudiantes,)
    @JoinColumn({name: 'idNivel'})
    nivel: Relation<CatalogoDetalle>;

    @ManyToOne(() => CatalogoDetalleEntity, (catalogoDetalle) => catalogoDetalle.estudiantesConEstado,)
    @JoinColumn({name: 'idEstado'})
    estado: Relation<CatalogoDetalle>;

    @OneToOne(() => UsuarioEntity, (usuario) => usuario.estudiante)
    @JoinColumn()
    usuario: Relation<Usuario>;

    @OneToMany(() => CursoAsignado, (cursoAsignado) => cursoAsignado.estudiante,)
    estudianteAsignado: CursoAsignado []
}