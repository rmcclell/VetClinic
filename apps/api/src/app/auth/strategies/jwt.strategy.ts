import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  vetId?: number | null;
  clientId?: number | null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1. Extract from HTTP-only cookie (web browser sessions)
        (req: Request) => {
          if (req && req.cookies && req.cookies['jwt']) {
            return req.cookies['jwt'];
          }
          return null;
        },
        // 2. Extract from Authorization: Bearer <token> (Swagger, mobile, REST clients)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'vetclinic-dev-secret-change-in-production',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        active: true,
        vetId: true,
        clientId: true,
      },
    });

    if (!user || !user.active) {
      throw new UnauthorizedException('User account is inactive or no longer exists');
    }

    return user;
  }
}
