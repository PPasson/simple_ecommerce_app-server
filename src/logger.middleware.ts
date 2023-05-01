import {  NestMiddleware, UnauthorizedException  } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from './auth/constants';
import * as jwt from 'jsonwebtoken';

export class LoggerMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: Function) {
      try {

          const authorization = req.headers.authorization;
          if (authorization) {          
            const _token = Array.isArray(authorization.split(' ')) ? authorization.split(' ')[1] : authorization;
            const _verifyToken = jwt.verify(_token, jwtConstants.secret);
            next();
          } else {
              throw new UnauthorizedException('เข้าสู่ระบบไม่สำเร็จ!'+ '@logger middleware')
          }

      } catch (error) {        
          throw new UnauthorizedException();
      }
  }
}
