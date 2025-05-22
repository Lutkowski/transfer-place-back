import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RequestCodeDto } from '../../shared/dto/request-auth-code.dto';
import { VerifyCodeDto } from '../../shared/dto/verify-code.dto';
import { AuthService } from '../../core/services/auth.service';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../shared/types/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-code')
  requestCode(@Body() dto: RequestCodeDto) {
    return this.authService.requestCode(dto.phone);
  }

  @Post('verify-code')
  verifyCode(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyCode(dto.phone, dto.code);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    console.log(req.user);
    return req.user;
  }
}
