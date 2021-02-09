import { IsDefined, IsString, Length } from 'class-validator';

export class AboutCreateDto {
  @IsDefined()
  @IsString()
  @Length(1, 255)
  public name!: string;

  @IsDefined()
  @IsString()
  @Length(1, 255)
  public surname!: string;
}
