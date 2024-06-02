import { ValidationError, NotFound, Conflict } from 'src/error/CustomError'

describe('CustomError', () => {
  describe('ValidationError', () => {
    it('should create a new ValidationError instance', () => {
      const errorData = [{ field: 'name', message: 'Name is required' }]
      const error = new ValidationError(errorData)
      expect(error).toBeInstanceOf(ValidationError)
      expect(error.message).toBe('400 - Validation Error')
      expect(error.errorData).toEqual(errorData)
    })
  })

  describe('NotFound', () => {
    it('should create a new NotFound instance', () => {
      const message = 'Resource not found'
      const error = new NotFound(message)
      expect(error).toBeInstanceOf(NotFound)
      expect(error.message).toBe(message)
    })
  })

  describe('Conflict', () => {
    it('should create a new Conflict instance', () => {
      const message = 'Conflict occurred'
      const error = new Conflict(message)
      expect(error).toBeInstanceOf(Conflict)
      expect(error.message).toBe(message)
    })
  })
})
