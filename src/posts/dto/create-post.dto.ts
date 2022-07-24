import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly content?: string;
}
