import { AnyObject } from 'immer/dist/types/types-internal';

export interface IData<T extends AnyObject = AnyObject> {
  code: number;
  payload: T;
  message: string;
  location?: string;
  stack?: Record<string, unknown>;
}

export class ApiResponse<T extends AnyObject> {
  public code: number;

  public payload: T;

  public message: string;

  public location?: string;

  public stack?: Record<string, unknown>;

  public error?: Record<string, unknown>;

  public constructor(data: IData<T>) {
    this.code = data.code;
    this.payload = data.payload;
    this.message = data.message;
    this.location = data.location;
    this.stack = data.stack;
  }
}
