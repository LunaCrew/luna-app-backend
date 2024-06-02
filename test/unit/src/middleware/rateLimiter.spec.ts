import rateLimit from 'express-rate-limit'
import rateLimiter from 'src/middleware/rateLimiter'

jest.mock('express-rate-limit')

describe('RateLimiter middleware', () => {
  it('should call express-rate-limit with the correct configuration', () => {
    expect(rateLimit).toHaveBeenCalledWith({
      windowMs: 60 * 1000 * 5,
      max: 10,
      message: 'Too many requests, please try again later.'
    })
  })

  it('should fail', () => {
    expect(rateLimiter).toBeUndefined()
  })
})
