import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './entity/account.entity';
import * as bcrypt from 'bcrypt';

@Controller('account')
export class AccountController {

    constructor(
        private accountService: AccountService
    ) { }

    @Post("create")
    create(@Body() account: Account): Promise<Account> {
        account.password = bcrypt.hashSync(account.password, bcrypt.genSaltSync());
        return this.accountService.create(account);
    }

    @Post("login")
    async login(@Body() account: Account): Promise<any> {
        if (await this.accountService.login(account.username, account.password)) {
            return {
                result: true
            }
        } else {
            throw new Error();
        }
    }

    @Put("update")
    update(@Body() account: Account): Promise<Account> {
        return this.accountService.update(account);
    }

    @Put("update-password")
    updatePassword(@Body() account: Account): Promise<Account> {
        account.password = bcrypt.hashSync(account.password, bcrypt.genSaltSync());
        return this.accountService.update(account);
    }

    @Get('find-by-username/:username')
    findById(@Param('username') username: string): Promise<Account> {
        return this.accountService.findByUsername(username);
    }

}
