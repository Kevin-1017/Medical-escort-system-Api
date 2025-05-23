import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

interface ValidationError {
  message: string | string[] | Record<string, unknown>;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] | Record<string, unknown> = '全局过滤器';

    if (exception instanceof HttpException) {
      message = exception.message;

      // 在DTO层字段验证出错，返回 400 错误，并且 message 是一个对象（即验证失败）
      if (status === Number(HttpStatus.BAD_REQUEST)) {
        const errorResponse = exception.getResponse() as ValidationError;
        message = errorResponse.message || '请求无效,非dto字段验证错误';
      }
    }

    const errorResponse = {
      code: 777,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
