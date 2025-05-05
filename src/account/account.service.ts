import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entity/account.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {

    constructor(
        @InjectModel(Account.name)
        private accountModel: Model<Account>
    ) { }

    create(account: Account): Promise<Account | null> {
        return this.accountModel.create(account);
    }

    async login(username: string, password: string): Promise<boolean> {
        let account = await this.accountModel.findOne({
            username: username
        }).exec();
        if (account != null) {
            return bcrypt.compareSync(password, account.password);
        }
        return false;
    }

    update(account: Account): Promise<Account | null> {
        return this.accountModel.findOneAndUpdate({
            username: account.username
        }, account, { new: true }).exec();
    }

    findByUsername(username: string): Promise<Account> {
        return this.accountModel.findOne({
            username: username
        }).exec();
    }

}
