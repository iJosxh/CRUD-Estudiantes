import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './usuario.entity.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepository.create({
      username: createUsuarioDto.username,
      password: createUsuarioDto.password,
    });

    usuario.rol = {
      idCatalogoDetalle: createUsuarioDto.idRol,
    } as CatalogoDetalle;

    usuario.estado = {
      idCatalogoDetalle: createUsuarioDto.idEstado,
    } as CatalogoDetalle;

    const usuarioGuardado =
      await this.usuarioRepository.save(usuario);

    return await this.usuarioRepository.findOne({
      where: {
        idUsuario: usuarioGuardado.idUsuario,
      },
      relations: {
        rol: true,
        estado: true,
      },
    });
  }

  async findAll() {
    return await this.usuarioRepository.find({
      relations: {
        rol: true,
        estado: true,
      },
    });
  }
}