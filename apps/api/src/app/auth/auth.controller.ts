import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Log in with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful. Returns access token and user profile.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials or inactive user.' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Current user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out and clear session cookie' })
  @ApiResponse({ status: 200, description: 'Logged out successfully.' })
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
