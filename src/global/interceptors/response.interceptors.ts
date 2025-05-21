import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        code: 666,
        message: '请求成功',
        data,
      })),
    );
  }
}
