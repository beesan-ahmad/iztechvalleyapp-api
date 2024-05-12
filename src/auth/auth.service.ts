import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { UserDetails } from 'src/users/user-details.interface';
import { ExistingUserDTO } from 'src/users/dtos/existing-user.dto';

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

    async doesPasswordMatch(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(
        email: string,
        password: string,
    ): Promise<UserDetails | null> {
        const user = await this.usersService.findByEmail(email);
        const doesUserExist = !!user;

        if (!doesUserExist) return null;

        const doesPasswordMatch = await this.doesPasswordMatch(
            password,
            user.password,
        );

        if (!doesPasswordMatch) return null;

        return this.usersService._getUserDetails(user);
    }

    async login(
        existingUser: ExistingUserDTO,
    ): Promise<{ token: string } | null> {
        const { email, password } = existingUser;
        const user = await this.validateUser(email, password);

        if (!user)
            throw new HttpException('Credentials invalid!', HttpStatus.UNAUTHORIZED);

        const jwt = await this.jwtService.signAsync({ user });
        return { token: jwt };
    }
}
