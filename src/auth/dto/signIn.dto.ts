import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from "class-validator";

export class SignInDto {

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50)
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(60)
    password: string;
}