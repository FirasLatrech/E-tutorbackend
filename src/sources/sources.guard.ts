import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SourcesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const Sources = this.reflector.getAllAndOverride<number[]>('Sources', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!Sources.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    return Sources.includes(request.user?.role?.id);
  }
}
