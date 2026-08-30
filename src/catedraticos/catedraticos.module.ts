import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatedraticosService } from './catedraticos.service.js';
import { CatedraticosController } from './catedraticos.controller.js';

import { Catedratico } from './catedratico.entity.js';
import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';

import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Catedratico,
      CatalogoDetalle,
    ]),

    AuthModule,
  ],

  controllers: [
    CatedraticosController,
  ],

  providers: [
    CatedraticosService,
  ],
})
export class CatedraticosModule {}