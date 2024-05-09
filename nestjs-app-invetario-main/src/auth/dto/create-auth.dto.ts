
import { IsBoolean,IsEmail, IsString, Matches, MaxLength, MinLength,IsOptional } from 'class-validator';

export class CreateAuthDto {

	@IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(10)
    password: string;

    @IsString()
    @MinLength(1)
    name: string;

    @IsOptional()
    @IsString()
    rol: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}
