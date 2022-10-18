import { ApiProperty  } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class responseDto {
  
    @ApiProperty()
    @IsNumber()
    statusCode: number;
  
    @ApiProperty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsString()
    error: string;

    @ApiProperty()
    response: any;


}