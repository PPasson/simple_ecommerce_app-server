import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: 2 })
    @IsNotEmpty()
    @IsNumber()
    QTY: number;

    @ApiProperty({ example: 'PACKING' })
    @IsNotEmpty()
    @IsString()
    orderStatus: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    productId: number
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}