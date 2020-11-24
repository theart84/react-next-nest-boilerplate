import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ErrorNextItem {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @IsDefined()
  @IsString()
  public message!: string;

  @IsOptional()
  @IsString()
  public stack?: string;
}
