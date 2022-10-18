import { ApiProperty  } from '@nestjs/swagger';
import {  IsString } from 'class-validator';
export class CreatePartnersLoginDto{}
export class addPartnersLoginDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

}

export class getPartnersUserDto {
  
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

}

