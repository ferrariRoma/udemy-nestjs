import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // is Login?
    if (!request.currentUser) {
      console.log('1번 지점에서 걸림');
      return false;
    }
    // is admin?
    return request.currentUser.admin;
  }
}
