import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PartnersLoginService } from './partners_login.service';
import { addPartnersLoginDto, getPartnersUserDto } from './dto/create-partners_login.dto';
import { UserExistGaurd } from '../auth/gaurds/user-exist.gaurd';
import { InsertResult } from 'typeorm';
import { PartnersLogin } from './entities/partners_login.entity';
import { UserAuthGaurd } from '../auth/gaurds/user-auth.gaurd';
import { responseDto } from '../common/dto/response.dto';

@ApiTags('partners')
@ApiBearerAuth()
//@UseGuards(UserAuthGaurd)
@Controller('partners')
export class PartnersLoginController {
  constructor(private readonly partnersLoginService: PartnersLoginService) {}


  @Post('/sign-up')
  @ApiResponse({ type: responseDto })
  public async addPartnerUser(
    @Body() addPartnerUser: addPartnersLoginDto,
  ): Promise<InsertResult["raw"]> {
    const response=await this.partnersLoginService.addPartnerUser(addPartnerUser);
    return {
      statusCode: 201,
      message:`success`,
      error:``,
      response:response
    }

  }

  @Post('/log-in')
  @UseGuards(UserExistGaurd)
  @ApiResponse({type : responseDto })
  public async logInPartnerUserWithJwt(
    @Body() addPartnerUser: addPartnersLoginDto,
  ): Promise<responseDto> {
    const response = await this.partnersLoginService.loginPartnerUser(addPartnerUser);
    return {
      statusCode: 201,
      message:`success`,
      error:``,
      response:response
    }
  }

  @Post('/check')
  @UseGuards(UserAuthGaurd)
  @ApiResponse({ type: InsertResult })
  public async check(
    @Body() addPartnerUser: addPartnersLoginDto,
  ): Promise<{}> {
    return {something:'working'};
  }

  @Post('/forgot-password')
  @ApiResponse({ type : responseDto })
  public async recoverPartnerUserPassword(
    @Body() recoverPartnerUserDto: getPartnersUserDto,
  ): Promise<responseDto> {
    const response=await this.partnersLoginService.recoverPartnerUserPassword(recoverPartnerUserDto);
    return {
      statusCode: 201,
      message:`success`,
      error:``,
      response:response
    }
  }
}

