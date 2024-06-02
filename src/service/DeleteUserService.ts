import { NextFunction, Request } from 'express'
import Log from '@lunacrew/logger'
import { UserService } from '../types/Service'
import ValidateUser from '../util/validation/ValidateUser'

export default class DeleteUserService {
  static execute(req: Request, next: NextFunction): UserService {
    try {
      const params = {
        id: req.params.id
      }

      return ValidateUser(params, next)
    } catch (error) {
      Log.e(`${error}`, 'DeleteUserService')
    }
  }
}
