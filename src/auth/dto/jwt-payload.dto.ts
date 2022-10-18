import { ApiProperty} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';


export class JwtPayloadDto {
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

}