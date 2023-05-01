import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'hello' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'hello' })
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty({ example: 'Hello' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'World' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'hello@gmail.com' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '096325695' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'ACTIVE' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: '112/44 Moo 10' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Lardpao' })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ example: 'SanamLuwang' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'BKK' })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty({ example: '10000' })
  @IsString()
  @IsNotEmpty()
  postcode: string;
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}