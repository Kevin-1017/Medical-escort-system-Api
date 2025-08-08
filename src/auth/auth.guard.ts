import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('未提供jwt令牌');
    }
    try {
      // 全局守卫已经自动解析token了
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['userInfo'] = payload;
    } catch {
      throw new UnauthorizedException('jwt令牌无效或过期');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // 从请求头中提取 a_token
    const token = request.headers['a_token'] as string;
    return token;
  }
}
