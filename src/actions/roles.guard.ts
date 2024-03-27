import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ActionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const Action = this.reflector.getAllAndOverride<number[]>('Action', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!Action.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    return Action.includes(request.user?.role?.id);
  }
}
