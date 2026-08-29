import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CatalogoDetalle } from './catalogo_detalle.entity.js';

@Entity()
export class Catalogo {
  @PrimaryGeneratedColumn()
  idCatalogo: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @OneToMany(() => CatalogoDetalle, (catalogoDetalle) => catalogoDetalle.catalogo,)
  detalles: CatalogoDetalle[];
}