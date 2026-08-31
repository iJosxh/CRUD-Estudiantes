import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Catalogo } from './entities/catalogo.entity.js';
import { CatalogoDetalle } from './entities/catalogo_detalle.entity.js';

@Injectable()
export class CatalogosService {
  constructor(
    @InjectRepository(Catalogo)
    private readonly catalogoRepository:
      Repository<Catalogo>,

    @InjectRepository(CatalogoDetalle)
    private readonly catalogoDetalleRepository:
      Repository<CatalogoDetalle>,
  ) {}

  async findDetallesPorCatalogo(nombreCatalogo: string) {
    const catalogo =
      await this.catalogoRepository.findOne({
        where: {
          nombre: nombreCatalogo,
        },
      });

    if (!catalogo) {
      throw new NotFoundException(
        `No existe el catálogo ${nombreCatalogo}`,
      );
    }

    const detalles =
      await this.catalogoDetalleRepository.find({
        where: {
          catalogo: {
            idCatalogo: catalogo.idCatalogo,
          },
        },
        relations: {
          catalogo: true,
        },
      });

    return detalles.map((detalle) => ({
      idCatalogoDetalle:
        detalle.idCatalogoDetalle,

      nombre:
        detalle.nombre,
    }));
  }

  findNiveles() {
    return this.findDetallesPorCatalogo('Nivel');
  }

  findEstados() {
    return this.findDetallesPorCatalogo('Estado');
  }

  findGrados() {
    return this.findDetallesPorCatalogo('Grado');
  }

  findCarreras() {
    return this.findDetallesPorCatalogo('Carrera');
  }

  findRoles() {
    return this.findDetallesPorCatalogo('Rol');
  }
}