import { Request, Response, NextFunction } from 'express'
import { MongoServerError } from 'mongodb'
import Log from '@lunacrew/logger'
import BaseError from '../error/BaseError'
import { ValidationError } from '../error/CustomError'
import HttpStatus from '../util/enum/HttpStatus'
import MongoDBError from '../util/enum/MongoDbError'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  switch (true) {
    case err instanceof ValidationError: {
      return res.status(err.status).json({ error: err.message, data: err.errorData })
    }

    case err instanceof BaseError: {
      if (err.isOperational) {
        return res.status(err.status).json({
          status: err.status < HttpStatus.code.INTERNAL_SERVER_ERROR && err.status >= HttpStatus.code.BAD_REQUEST ? 'fail' : 'error',
          message: err.message
        })
      } else {
        Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })
        return res.status(err.status).json({ message: CustomErrorMessage.GENERIC })
      }
    }

    case err instanceof MongoServerError: {
      if (err.code === MongoDBError.code.DUPLICATE_KEY) {
        Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })

        switch (true) {
          case err.message.includes('email'): {
            return res.status(HttpStatus.code.CONFLICT).json({ error: CustomErrorMessage.CONFLICT_EMAIL })
          }
          case err.message.includes('id'): {
            return res.status(HttpStatus.code.CONFLICT).json({ error: CustomErrorMessage.CONFLICT_ID })
          }
          default: {
            return res.status(HttpStatus.code.CONFLICT).json({ error: CustomErrorMessage.CONFLICT })
          }
        }
      } else {
        Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })
        return res.status(HttpStatus.code.INTERNAL_SERVER_ERROR).json({ error: CustomErrorMessage.INTERNAL_SERVER_ERROR })
      }
    }

    default: {
      Log.custom(`${err.stack}`, { tag: 'ErrorHandler' })
      return res.status(HttpStatus.code.INTERNAL_SERVER_ERROR).json({ error: CustomErrorMessage.GENERIC })
    }
  }
}

export { errorHandler }
