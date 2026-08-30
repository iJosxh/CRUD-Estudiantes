import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import {
  ROLES_KEY,
} from '../decorators/roles.decorator.js';

interface UsuarioJwt {
  sub: number;
  username: string;
  rol: string;
}

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const rolesPermitidos =
      this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (!rolesPermitidos) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<
        Request & { user?: UsuarioJwt }
      >();

    const usuario = request.user;

    if (!usuario) {
      throw new ForbiddenException(
        'Usuario no autenticado',
      );
    }

    if (
      !rolesPermitidos.includes(usuario.rol)
    ) {
      throw new ForbiddenException(
        'No tiene permisos para realizar esta acción',
      );
    }

    return true;
  }
}