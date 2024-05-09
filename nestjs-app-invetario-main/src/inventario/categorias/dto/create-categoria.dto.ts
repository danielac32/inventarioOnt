
import {IsNotEmpty, IsEmail, IsString, Matches, MaxLength, MinLength,IsOptional } from 'class-validator';

export class CreateCategoriaDto {
	@IsNotEmpty()
    @MinLength(1)
	@IsString()
    name: string;
}
 