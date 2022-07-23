import { Trim, NormalizeEmail } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @NormalizeEmail(true)
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly firstName?: string;

  @IsString()
  @IsOptional()
  public readonly lastName?: string;
}

export class LoginDto {
  @Trim()
  @NormalizeEmail(true)
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}