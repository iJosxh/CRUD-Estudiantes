import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createObserveModule } from '@nestjs/observe';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { Catalogo } from './catalogos/entities/catalogo.entity.js';
import { CatalogoDetalle } from './catalogos/entities/catalogo_detalle.entity.js';
import { Usuario } from './usuarios/usuario.entity.js';
import { Catedratico } from './catedraticos/catedratico.entity.js';
import { Estudiante } from './estudiantes/estudiante.entity.js';
import { Curso } from './cursos/curso.entity.js';
import { CursoAsignado } from './asignaciones/curso-asignado.entity.js';

import { EstudiantesModule } from './estudiantes/estudiantes.module.js';
import { CatedraticosModule } from './catedraticos/catedraticos.module.js';
import { CursosModule } from './cursos/cursos.module.js';
import { AsignacionesModule } from './asignaciones/asignaciones.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'backend',
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        options: {
          trustServerCertificate: true,
        },
        entities: [
          Catalogo,
          CatalogoDetalle,
          Usuario,
          Catedratico,
          Estudiante,
          Curso,
          CursoAsignado,
          AsignacionesModule,
        ],
        synchronize: false,
      }),
    }),

    EstudiantesModule,
    CatedraticosModule,
    CursosModule,
    AsignacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}