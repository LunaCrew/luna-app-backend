import { User } from './User'

export type JwtPayload = {
  sub: string;
  iat?: number;
  exp?: number;
}

export type Done = (error: unknown, user?: User | boolean, options?: object) => void
