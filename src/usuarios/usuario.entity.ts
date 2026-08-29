import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';
import { CatalogoDetalle as CatalogoDetalleEntity } from '../catalogos/entities/catalogo_detalle.entity.js';
import { Estudiante } from '../estudiantes/estudiante.entity.js';

import type { Relation } from 'typeorm';

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    idUsuario: number

    @Column('varchar', {length: 50})
    username: string

    @Column('varchar', {length: 150})
    password: string

    @ManyToOne(() => CatalogoDetalleEntity, (catalogoDetalle) => catalogoDetalle.usuariosConRol,)
    @JoinColumn({ name: 'idRol' })
    rol: Relation<CatalogoDetalle>;

    @ManyToOne(() => CatalogoDetalleEntity, (catalogoDetalle) => catalogoDetalle.usuariosConEstado,)
    @JoinColumn({ name: 'idEstado' })
    estado: Relation<CatalogoDetalle>;

    @OneToOne(() => Estudiante, (estudiante) => estudiante.usuario)
    estudiante: Estudiante
}