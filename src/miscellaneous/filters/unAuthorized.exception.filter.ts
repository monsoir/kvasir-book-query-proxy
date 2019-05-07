import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';
import { Catch, UnauthorizedException, Inject, HttpServer, ArgumentsHost } from '@nestjs/common';
import { Response } from '$src/miscellaneous/formats/response.format';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionExceptionFilter extends BaseExceptionFilter {
  constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
    super(applicationRef);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const response = ctx.getResponse();
    response.status(status).json(new Response(false, exception.message.message));
  }
}
