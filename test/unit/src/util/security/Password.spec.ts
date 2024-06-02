import Password from 'src/util/security/Password'

describe(':: Util :: Log :: Password ::', () => {
  it('should validate the password correctly', () => {
    const password = 'testPassword'
    const hashedPassword = Password.encrypt(password)

    const isValid = Password.validate(password, hashedPassword)

    expect(isValid).toBe(true)
  })

  it('should return false when the password is incorrect', () => {
    const password = 'testPassword'
    const incorrectPassword = 'incorrectPassword'
    const hashedPassword = Password.encrypt(password)

    const isValid = Password.validate(incorrectPassword, hashedPassword)

    expect(isValid).toBe(false)
  })
})
