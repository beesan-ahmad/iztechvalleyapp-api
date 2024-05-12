import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ExistingUserDTO {
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