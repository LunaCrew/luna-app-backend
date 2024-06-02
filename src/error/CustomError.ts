import BaseError from './BaseError'
import CustomErrorMessage from '../util/enum/CustomErrorMessage'
import HttpStatus from '../util/enum/HttpStatus'
import { MongoServerError } from 'mongodb'

export class ValidationError extends BaseError {
  errorData: Record<string, string>[] = []
  constructor(data: Record<string,string>[]) {
    super(CustomErrorMessage.VALIDATION, HttpStatus.code.BAD_REQUEST)
    this.errorData = data
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

export class NotFound extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.code.NOT_FOUND)
    Object.setPrototypeOf(this, NotFound.prototype)
  }
}

export class Conflict extends MongoServerError {
  constructor(message: string) {
    super({ message })
    Object.setPrototypeOf(this, Conflict.prototype)
  }
}

export class BadRequest extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.code.BAD_REQUEST)
    Object.setPrototypeOf(this, BadRequest.prototype)
  }
}
