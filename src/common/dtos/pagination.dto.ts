import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Transform } from "class-transformer";
export class PaginationDto {

    @Transform(({ value }) => {
        return Number(value);
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    pageNumber: number = 1;

    @Transform(({ value }) => {
        return Number(value);
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    limit: number = 15;
}