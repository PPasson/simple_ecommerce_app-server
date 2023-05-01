import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/database/entities/user.entity";
import * as bcrypt from "bcrypt";
import { hash } from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('validating user');
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new UnauthorizedException("User not found!");
    }

    const _match = await bcrypt.compare(pass, user.password);
    //console.log(_match);
    if (_match) {
      const { password, ...result } = user;
    console.log('result..', result);

      return result;
    }
    throw new UnauthorizedException("Password is wrong!");
  }

  async login(user: User) {
    console.log('logging in..', user);
    const LoggedInUser = await this.userRepository.findOne({
      where: { username: user.username },
    });
    const payload = {
      username: LoggedInUser.username,
      id: LoggedInUser.id,
      firstName: LoggedInUser.firstName,
    };
    console.log('payload', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async logout(user: any) {
    const payload = {};
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: 1 }),
    };
  }

  async registerUser(body: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if(user){
      throw new Error('This username already exists!');
    }
    const saltRound = process.env.SALT_ROUND;
    body.password = await hash(body.password, saltRound);
    return await this.userRepository.save({ ...body });
  }
}
