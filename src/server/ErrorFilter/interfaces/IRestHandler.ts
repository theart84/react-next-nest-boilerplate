import { Response } from 'express';

export interface IRestHandler {
  handle(err, res: Response): void;
}
