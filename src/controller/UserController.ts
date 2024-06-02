import { NextFunction, Request, Response } from 'express'
import Log from '@lunacrew/logger'
import { collections } from '../app'
import { NotFound, BadRequest } from '../error/CustomError'
import { UserService } from '../types/Service'
import CreateUserService from '../service/CreateUserService'
import GetUserService from '../service/GetUserService'
import DeleteUserService from '../service/DeleteUserService'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import Password from '../util/security/Password'
import JWT from '../util/security/JWT'

export default class UserController {
  public static readonly createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: UserService = CreateUserService.execute(req, next)
      if (!user) return

      const result = await collections.users.insertOne(user).catch((error) => {
        next(error)
      })

      if (result) {
        res.status(HttpStatus.code.CREATED).json({ id: result.insertedId })
      }
      Log.i('UserController :: Calling Endpoint :: CreateUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: CreateUser')
    }
  }

  public static readonly getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UserService = GetUserService.execute(req, next)
      if (!query) return

      const result = await collections.users.findOne(query, { projection: { password: 0 } })

      if (result) {
        res.status(HttpStatus.code.OK).json(result)
      } else {
        next(new NotFound(CustomErrorMessage.NOT_FOUND))
        next()
      }
      Log.i('UserController :: Calling Endpoint :: GetUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: GetUser')
    }
  }

  public static readonly deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UserService = DeleteUserService.execute(req, next)
      if (!query) return

      const result = await collections.users.deleteOne(query).catch((error) => {
        next(error)
      })

      if (result?.deletedCount) {
        res.status(HttpStatus.code.NO_CONTENT).send()
      } else {
        next(new NotFound(CustomErrorMessage.NOT_FOUND))
        next()
      }
      Log.i('UserController :: Calling Endpoint :: DeleteUser')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: DeleteUser')
    }
  }

  public static readonly login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query: UserService = GetUserService.execute(req, next)
      if (!query) return

      const user = await collections.users.findOne(query, { projection: { password: 1, _id: 1 } })

      if (!user) {
        next(new BadRequest(CustomErrorMessage.LOGIN_FAILED))
        next()
      } else {
        const isValid = Password.validate(req.body.password, user.password)

        if (isValid) {
          const token = JWT.issueJWT(user._id.toString())
          res.status(HttpStatus.code.OK).send({
            success: true,
            token: token.token,
            expiresIn: token.expiresIn
          })
        } else {
          next(new BadRequest(CustomErrorMessage.LOGIN_FAILED))
          next()
        }
      }
      Log.i('UserController :: Calling Endpoint :: Login')
    } catch (error) {
      Log.e(`${error}`, 'UserController :: Login')
    }
  }
}
