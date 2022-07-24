import { IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public readonly firstName?: string;

  @IsString()
  @IsOptional()
  public readonly lastName?: string;
}
