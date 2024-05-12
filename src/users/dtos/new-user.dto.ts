import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class NewUserDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(60)
    password: string;
  }