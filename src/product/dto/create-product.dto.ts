import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Shirt' })
    @IsNotEmpty()
    @IsString()
    productName: string;

    @ApiProperty({ example: 99 })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ example: 'READY' })
    @IsNotEmpty()
    @IsString()
    productStatus: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}