import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@springfieldvet.com',
    description: 'User email address',
  })
  email!: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'User password',
  })
  password!: string;
}
