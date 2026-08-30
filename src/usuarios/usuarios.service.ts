import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './usuario.entity.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { CatalogoDetalle } from '../catalogos/entities/catalogo_detalle.entity.js';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository:
      Repository<Usuario>,
  ) {}

  async create(
    createUsuarioDto: CreateUsuarioDto,
  ) {
    const usuarioExistente =
      await this.usuarioRepository.findOne({
        where: {
          username:
            createUsuarioDto.username,
        },
      });

    if (usuarioExistente) {
      throw new ConflictException(
        'El nombre de usuario ya existe',
      );
    }

    const usuario =
      this.usuarioRepository.create({
        username:
          createUsuarioDto.username,

        password:
          createUsuarioDto.password,
      });

    usuario.rol = {
      idCatalogoDetalle:
        createUsuarioDto.idRol,
    } as CatalogoDetalle;

    usuario.estado = {
      idCatalogoDetalle:
        createUsuarioDto.idEstado,
    } as CatalogoDetalle;

    const usuarioGuardado =
      await this.usuarioRepository.save(
        usuario,
      );

    const usuarioCreado =
      await this.usuarioRepository.findOne({
        where: {
          idUsuario:
            usuarioGuardado.idUsuario,
        },
        relations: {
          rol: true,
          estado: true,
        },
      });

    if (!usuarioCreado) {
      return null;
    }

    // No devolvemos password
    return {
      idUsuario:
        usuarioCreado.idUsuario,

      username:
        usuarioCreado.username,

      rol:
        usuarioCreado.rol,

      estado:
        usuarioCreado.estado,
    };
  }

  async findAll() {
    const usuarios =
      await this.usuarioRepository.find({
        relations: {
          rol: true,
          estado: true,
        },
      });

    // Tampoco exponemos passwords al listar
    return usuarios.map((usuario) => ({
      idUsuario:
        usuario.idUsuario,

      username:
        usuario.username,

      rol:
        usuario.rol,

      estado:
        usuario.estado,
    }));
  }
}