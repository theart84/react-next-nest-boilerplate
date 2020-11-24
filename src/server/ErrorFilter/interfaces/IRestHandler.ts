import { Response } from 'express';

export interface IRestHandler {
  handle(err: Error, res: Response): void;
}
