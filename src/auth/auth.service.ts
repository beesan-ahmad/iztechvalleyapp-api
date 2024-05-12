import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { UserDetails } from 'src/users/user-details.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
        const { name, email, password } = user;

        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser)
            throw new HttpException(
                'An account with that email already exists!',
                HttpStatus.CONFLICT,
            );

        const hashedPassword = await this.hashPassword(password);

        const newUser = await this.usersService.create(name, email, hashedPassword);
        return this.usersService._getUserDetails(newUser);
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
