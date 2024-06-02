import { Request, Response, NextFunction } from 'express'
import { MongoServerError } from 'mongodb'
import { errorHandler } from 'src/middleware/errorHandler'
import { ValidationError } from 'src/error/CustomError'
import BaseError from 'src/error/BaseError'
import HttpStatus from 'src/util/enum/HttpStatus'

describe('errorHandler', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response
    next = jest.fn() as NextFunction
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle BaseError', () => {
    const error = new BaseError('Test error', HttpStatus.code.BAD_REQUEST)
    errorHandler(error, req, res, next)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.code.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: 'Test error', status: 'fail' })
  })

  it('should handle ValidationError', () => {
    const error = new ValidationError([{ field: 'test', message: 'test' }])
    errorHandler(error, req, res, next)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.code.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: '400 - Validation Error', data: [{ field: 'test', message: 'test' }] })
  })

  it('should handle MongoDBError', () => {
    const error = new MongoServerError({ message: 'MongoDB error', code: 11000 })
    errorHandler(error, req, res, next)
    expect(res.status).toHaveBeenCalledWith(HttpStatus.code.CONFLICT)
    expect(res.json).toHaveBeenCalledWith({ error: '409 - Conflict' })
  })
})
