import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel : Model<User>){}

    async register(userData: any):Promise<User>{
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
}
