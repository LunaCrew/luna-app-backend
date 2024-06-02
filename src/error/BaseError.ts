export default class BaseError extends Error {
  status: number
  isOperational: boolean

  constructor(message: string, status: number, isOperational: boolean = true) {
    super(message)
    this.status = status
    this.isOperational = isOperational
    Object.setPrototypeOf(this, BaseError.prototype)
  }
}
