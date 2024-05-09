import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
}
