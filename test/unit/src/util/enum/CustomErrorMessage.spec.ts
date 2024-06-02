import CustomErrorMessage from 'src/util/enum/CustomErrorMessage'

describe(':: Util :: Enum :: CustomErrorMessage ::', () => {
  it('should have all the keys', () => {
    const expectedKeys = [
      'PASSWORD',
      'DATE_TIME_TIMEZONE',
      'VALIDATION',
      'LOGIN_FAILED',
      'AUTH_NOT_PROVIDED',
      'UNAUTHORIZED',
      'FORBIDDEN',
      'NOT_FOUND',
      'CONFLICT',
      'CONFLICT_EMAIL',
      'CONFLICT_ID',
      'INTERNAL_SERVER_ERROR',
      'SERVICE_UNAVAILABLE',
      'GENERIC'
    ]

    const enumKeysDeclared = Object.keys(CustomErrorMessage)

    expect(expectedKeys).toEqual(enumKeysDeclared)
  })

  it('should have all the values', () => {
    const expectedValues = [
      '"password" must have uppercase and lowercase letters, numbers and special characters',
      '"dateTime" must be in ISO format <YYYY-MM-DD>T<HH:mm:ss>-<HH:mm>',
      '400 - Validation Error',
      '400 - Login Failed - Invalid Credentials',
      '401 - No token provided',
      '401 - Unauthorized',
      '403 - Forbidden',
      '404 - User Not Found',
      '409 - Conflict',
      '409 - Email Already in Use',
      '409 - Id Already in Use',
      '500 - Internal Server Error',
      '503 - Service Unavailable',
      'Something went wrong'
    ]

    const enumValuesDeclared = Object.values(CustomErrorMessage)
    expect(expectedValues).toEqual(enumValuesDeclared)
  })
})
