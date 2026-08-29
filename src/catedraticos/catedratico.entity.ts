import { Column, Entity, JoinColumn, OneToMany,ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { CatalogoDetalle as CatalogoDetalleEntity } from '../catalogos/entities/catalogo_detalle.entity.js';
import type { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';
import { Curso } from '../cursos/curso.entity.js';

import type { Relation } from 'typeorm';


@Entity()
export class Catedratico{
    @PrimaryGeneratedColumn()
    idCatedratico: number

    @Column('varchar', {length: 50})
    nombre: string

    @Column('varchar', {length: 50})
    apellido: string

    @ManyToOne(() => CatalogoDetalleEntity, (catalogoDetalle) => catalogoDetalle.catedraticosConEstado,)
    @JoinColumn({name: 'idEstado'})
    estado: Relation<CatalogoDetalle>;
    
    @OneToMany(() => Curso, (curso) => curso.catedratico,)
    cursos: Curso[];
}