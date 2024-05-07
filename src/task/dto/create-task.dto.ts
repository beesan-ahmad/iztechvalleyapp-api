import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @Matches(/^[a-zA-Z][a-zA-Z0-9 ]*$/, { each: true, message: 'The title should be string' })
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(360)
    description: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    status: string;
}
