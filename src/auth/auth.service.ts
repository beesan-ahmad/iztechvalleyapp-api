import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
      }
      
    // async signIn(username, pass) {
    //     const user = await this.usersService.findOne(username);
    //     if (user?.password !== pass) {
    //         throw new UnauthorizedException();
    //     }
    //     const payload = { sub: user.userId, username: user.username };
    //     return {
    //         access_token: await this.jwtService.signAsync(payload),
    //     };
    // }
}
