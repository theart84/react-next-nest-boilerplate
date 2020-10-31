import { AnyObject } from 'immer/dist/types/types-internal';

export interface IData<T extends AnyObject> {
  code: number;
  payload: T;
  message: string;
  location?: string;
}

export class ApiResponse<T extends AnyObject> {
  public code: number;

  public payload: T;

  public message: string;

  public location?: string;

  public constructor(data: IData<T>) {
    this.code = data.code;
    this.payload = data.payload;
    this.message = data.message;
    this.location = data.location;
  }
}
