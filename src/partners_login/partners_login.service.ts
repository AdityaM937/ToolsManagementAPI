import { forwardRef, Inject, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Base } from '../common/base';
import { InsertResult, UpdateResult } from 'typeorm';
import {
  addPartnersLoginDto,
  getPartnersUserDto,
} from './dto/create-partners_login.dto';
import * as bcrypt from 'bcrypt';
import { PartnersLogin } from './entities/partners_login.entity';
import { saltConstant } from '../auth/constants';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PartnersLoginService extends Base {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    super();
  }
  public async getPartnerUser(
    username: string,
    profileId?: number,
  ): Promise<PartnersLogin> {
    const manager = await this.getDataSourceManager();
    const query = await manager
      .createQueryBuilder(PartnersLogin, 'PartnersLogin')
      .select()
      .where('username = :username', { username: username });

    if (profileId) {
      query.andWhere('profileId = :profileId', { profileId });
    }
    const result = await query.getOne();
    this.logger.debug('Returning result');
    this.logger.debug(JSON.stringify(result));
    return result;
  }

  public async loginPartnerUser(
    addPartnerUser: addPartnersLoginDto,
  ): Promise<any> {
    return this.authService.login(addPartnerUser);
  }

  public async recoverPartnerUserPassword(
    recoverPartnerUser: getPartnersUserDto,
  ): Promise<PartnersLogin> {
    const user = await this.getPartnerUser(recoverPartnerUser.username);
    if (!user) {
     throw new NotFoundException('user not found');
    }
    const manager = await this.getDataSourceManager();
    const saltOrRounds = saltConstant.saltOrRounds;
    try {
      this.logger.debug('Getting entity before update');
      this.logger.debug(JSON.stringify(user));
      let updateResult: UpdateResult = null;
      this.logger.debug('Starting Transaction ');
      const hash = await bcrypt.hash(recoverPartnerUser.password, saltOrRounds);
      updateResult = await manager
        .createQueryBuilder()
        .update(PartnersLogin)
        .set({password: hash })
        .where('username = :username', {username: recoverPartnerUser.username})
        .execute();
      this.logger.debug('Returning result');
      let afterUpdate = await this.getPartnerUser(recoverPartnerUser.username);
      delete afterUpdate.password;
      this.logger.debug(JSON.stringify(afterUpdate));
      return afterUpdate;
    } catch (err) {
      this.logger.debug(JSON.stringify(err));
      throw new InternalServerErrorException(err);
    }
  }
  public async addPartnerUser(
    addPartnerUser: addPartnersLoginDto,
  ): Promise<InsertResult> {
    const manager = await this.getDataSourceManager();
    const saltOrRounds = saltConstant.saltOrRounds;
    try {
      let insertResult: InsertResult = null;
      this.logger.debug('Starting Transaction ');
      const hash = await bcrypt.hash(addPartnerUser.password, saltOrRounds);
      insertResult = await manager
        .createQueryBuilder()
        .insert()
        .into(PartnersLogin)
        .values({
          username: addPartnerUser.username,
          password: hash
        })
        .execute();
      this.logger.debug('Returning result');
      this.logger.debug(JSON.stringify(insertResult));
      return insertResult['raw'][0];
    } catch (err) {
      throw new NotAcceptableException(err.message);
    }
  }
}
