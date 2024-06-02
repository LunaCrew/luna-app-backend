import { NextFunction, Request } from 'express'
import { v4 as newUUID } from 'uuid'
import Log from '@lunacrew/logger'
import { UserService } from '../types/Service'
import { User } from '../types/User'
import userSchema from '../schema/userSchema'
import { ValidationError } from '../error/CustomError'
import Password from '../util/security/Password'

export default class CreateUserService {
  static execute(req: Request, next: NextFunction): UserService {
    try {
      const { error, value } = userSchema.validate(req.body)

      if (error) {
        next(new ValidationError(error.details.map((detail) => {
          const key = detail.context?.key ?? ''
          return {
            [key]: detail.message
          }
        })))
        next()
      } else {
        return this._buildQuery(value)
      }
    } catch (error) {
      Log.e(`${error}`, 'CreateUserService')
      return null
    }
  }

  private static _buildQuery(user: User): object {
    user._id = newUUID()
    user.password = Password.encrypt(user.password)
    return user
  }
}
