/*
eslint
no-param-reassign: off,
prefer-arrow/prefer-arrow-functions: off,
func-names: off,
@typescript-eslint/no-unsafe-return: off,
prefer-rest-params: off
*/
import { Inject, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggerService } from '@server/Logger/services/LoggerService';

export const MAX_RESPONSE_BODY_LENGTH_TO_LOG = 5_128;

export class LoggerMiddleware implements NestMiddleware {
  public constructor(
    @Inject(LoggerService)
    private readonly logger: LoggerService,
  ) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    void this.logger.info('New request has come', {
      extra: {
        request: {
          ip: req.ip,
          url: req.baseUrl,
          headers: req.headers,
          method: req.method,
          query: req.query,
          body: req.body,
        },
      },
    });

    const oldWrite: typeof res.write = res.write.bind(res);

    const oldEnd: typeof res.end = res.end.bind(res);

    const chunks: Uint8Array[] = [];

    res.write = function (chunk) {
      chunks.push(chunk);

      return oldWrite.apply(
        res,
        (arguments as unknown) as Parameters<typeof res.write>,
      );
    };

    res.end = function (chunk) {
      if (chunk) {
        chunks.push(chunk);
      }

      oldEnd.apply(res, (arguments as unknown) as Parameters<typeof res.end>);
    };

    res.on('finish', () => {
      let body;

      try {
        body = Buffer.concat(chunks).toString();
      } catch {
        [body] = chunks;
      }

      let bodyToLog: [];

      try {
        bodyToLog = JSON.parse(body);
      } catch {
        bodyToLog = body;
      }

      void this.logger.info('Made the response', {
        extra: {
          response: {
            statusCode: res.statusCode,
            headers: res.getHeaders(),
            body:
              bodyToLog.length > MAX_RESPONSE_BODY_LENGTH_TO_LOG
                ? `Too big body! ${MAX_RESPONSE_BODY_LENGTH_TO_LOG} symbols max`
                : bodyToLog,
          },
        },
      });
    });

    next();
  }
}
