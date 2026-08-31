import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatalogosController } from './catalogos.controller.js';
import { CatalogosService } from './catalogos.service.js';

import { Catalogo } from './entities/catalogo.entity.js';
import { CatalogoDetalle } from './entities/catalogo_detalle.entity.js';

import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Catalogo,
      CatalogoDetalle,
    ]),

    AuthModule,
  ],

  controllers: [
    CatalogosController,
  ],

  providers: [
    CatalogosService,
  ],

  exports: [
    CatalogosService,
  ],
})
export class CatalogosModule {}