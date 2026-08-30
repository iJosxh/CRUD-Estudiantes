import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Usuario } from '../usuarios/usuario.entity.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        username: loginDto.username,
      },
      relations: {
        rol: true,
        estado: true,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException(
        'Usuario o contraseña incorrectos',
      );
    }

    if (usuario.password !== loginDto.password) {
      throw new UnauthorizedException(
        'Usuario o contraseña incorrectos',
      );
    }

    const payload = {
      sub: usuario.idUsuario,
      username: usuario.username,
      rol: usuario.rol.nombre,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,

      usuario: {
        idUsuario: usuario.idUsuario,
        username: usuario.username,
        rol: usuario.rol.nombre,
      },
    };
  }
}