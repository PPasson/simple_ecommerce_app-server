import { BadRequestException, Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async validatePincode(body: pincodeDto) {
    const input = (body.input);

    //แปลงเป็นเลขเพื่อใช้ในการคำนวณเลขข้อ 3
    const numArray = Number(input).toString().split('').map(Number);
    console.log(numArray);

    //1.เช็คความยาวต้องมากกว่า 6
    if (input.length < 6) {
       throw new BadRequestException('ความยาวต้องมากกว่าหรือเท่ากับ 6');
    }

    // 2.เช็คจะต้องไม่มีเลขซ้ำกันเกิน 2 ตัว
    let duplicate = 0;
    for (let i = 1; i < input.length; i++) {
      if (input[i] === input[i - 1]) {
        duplicate++;
        i++;
      }
    }
    if (duplicate >= 2) {
      throw new BadRequestException('จะต้องไม่มีเลขซ้ำกันเกิน 2 ชุด');
    }

    // 3.เช็คจะต้องไม่เรียงกันเกิน 2 ตัว
    for (let i = 0; i < numArray.length; i++) {
      if ((numArray[i] === (numArray[i + 1]+1) && numArray[i] === (numArray[i + 2]+2)) || (numArray[i] === (numArray[i + 1] - 1) && numArray[i] === (numArray[i + 2] - 2))) {
        throw new BadRequestException('จะต้องไม่เรียงกันเกิน 2 ตัว');
      }
    }

    // 4.เช็คจะต้องไม่มีเลขชุดซ้ำเกิน 2 ชุด
    let sets = 0;
    for (let i = 1; i < input.length; i++) {
      if (input[i] === input[i - 1]) {
        sets++;
        i++;
      }
    }
    if (sets > 2) {
      throw new BadRequestException('จะต้องไม่มีเลขชุดซ้ำเกิน 2 ชุด');
    }

    //เคสผ่านทุกเงื่อนไข
    return 'Pincode ผ่านทุกเงื่อนไขแล้ว!!';
  }
}

export class pincodeDto {
  @ApiProperty({ example: "125236" })
  @IsNotEmpty()
  @IsString()
  input: string;
}
