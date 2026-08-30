import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Catedratico } from './catedratico.entity.js';
import { CatedraticosService } from './catedraticos.service.js';
import { CatedraticosController } from './catedraticos.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Catedratico,
    ]),
  ],
  controllers: [
    CatedraticosController,
  ],
  providers: [
    CatedraticosService,
  ],
})
export class CatedraticosModule {}