import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
private readonly jwtService: JwtService,
) {}

  async register(userData: any): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async login(loginData: any) {
    const { email, password } = loginData;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }

    const payload = { userId: user._id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token: token,
    };
  }
}
