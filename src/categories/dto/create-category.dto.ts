import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly description?: string;
}
