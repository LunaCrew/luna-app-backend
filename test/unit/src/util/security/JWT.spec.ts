import jwt from 'jsonwebtoken'
import JWT from 'src/util/security/JWT'

describe('JWT', () => {

})
describe('JWT', () => {
  it('should issue a JWT token with the correct payload and expiration', () => {
    process.env.JWT_SECRET = 'test-secret-key'

    const now = Date.now()
    jest.spyOn(Date, 'now').mockReturnValue(now)

    const userId = '863e696e-6666-48d7-8382-63bf3c4a9ed5'
    const result = JWT.issueJWT(userId)

    const decodedToken = jwt.verify(result.token, 'test-secret-key')
    expect(decodedToken.sub).toBe(userId)
    expect(result.expiresIn).toBe('1h')
  })
})
