import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { UserSchema, UserDocument } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidationExeption } from '../validator/validator.exeption';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUseryDto } from './dto/LoginUser';

const salt = 4;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto, req: object) {
    const foundUser = await this.UserModel.findOne({ email: dto.email });
    if (dto.password.length < 8) throw new ValidationExeption({ user: {}, error: false, errors: ['Password must contain at least 8 characters'] }, 403);

    if (!foundUser) {
      dto.password = await bcrypt.hash(dto.password, salt);
      const token = await this.jwtService.signAsync(dto);
      const created = new this.UserModel({ ...dto, ...{ token } });
      created.save();
      return { user: created, error: false, errors: [] };
    } else {
      throw new ValidationExeption({ user: {}, error: false, errors: ['Already exists'] }, 409);
    }
  }

  async login(dto: LoginUseryDto, req: object) {
    const foundUser = await this.UserModel.findOne({ email: dto.email });
    if (foundUser) {
      const isMatch = await bcrypt.compare(dto.password, foundUser.password);
      if (isMatch) {
        const token = await this.jwtService.signAsync({
          _id: foundUser._id.toString(),
          firstName: foundUser.firstName,
          LastName: foundUser.LastName,
          email: foundUser.email,
          password: foundUser.password,
        });

        this.UserModel.updateOne({ _id: foundUser._id }, { token: token }).exec();
        return { id: foundUser._id, token: token, error: false, errors: [] };
      } else {
        throw new ValidationExeption({ token: '', id: '', error: false, errors: ['Password is invalid'] }, 403);
      }
    } else {
      throw new ValidationExeption({ token: '', id: '', error: false, errors: ['User Not Found'] }, 409);
    }
  }

  //for another services
  async checkAuth(token: string) {
    if (!token) {
      throw new ValidationExeption({ id: '', error: false, errors: ['Invalid Bearer token from authorization'] }, 400);
    }
    token = token.split('Bearer ')[1];
    const found = await this.UserModel.findOne({ token }).exec();
    if (!found) throw new ValidationExeption({ id: '', error: false, errors: ['Invalid Bearer token from authorization'] }, 400);

    return found;
  }

  async getUserById(id: string) {
    const found = await this.UserModel.findOne({ _id: id }).exec();
    if (!found) throw new ValidationExeption({ id: '', error: false, errors: ['User Not Found'] }, 400);
    return found;
  }
}
