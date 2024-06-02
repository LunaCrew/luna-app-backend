import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Log from '@lunacrew/logger'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  const secret = process.env.JWT_SECRET as string

  if (!token) {
    return res.status(HttpStatus.code.UNAUTHORIZED).json({ error: CustomErrorMessage.AUTH_NOT_PROVIDED })
  }

  try {
    const decoded = jwt.verify(token, secret)
    req.user = decoded

    next()
  } catch (error) {
    Log.e(`${error}`, 'Auth Middleware')
    return res.status(HttpStatus.code.INTERNAL_SERVER_ERROR).json({ error: CustomErrorMessage.INTERNAL_SERVER_ERROR })
  }
}

export default auth
