import BaseError from 'src/error/BaseError'

describe('BaseError', () => {
  it('should create a new BaseError instance', () => {
    const error = new BaseError('Test error', 500, true)

    expect(error).toBeInstanceOf(BaseError)
    expect(error.message).toBe('Test error')
    expect(error.status).toBe(500)
    expect(error.isOperational).toBe(true)
  })

  it('should create a new BaseError instance with default isOperational value', () => {
    const error = new BaseError('Test error', 500)

    expect(error).toBeInstanceOf(BaseError)
    expect(error.message).toBe('Test error')
    expect(error.status).toBe(500)
    expect(error.isOperational).toBe(true)
  })
})
