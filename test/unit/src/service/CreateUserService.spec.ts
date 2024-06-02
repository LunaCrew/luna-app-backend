import { Request } from 'express'
import CreateUserService from 'src/service/CreateUserService'
import userSchema from 'src/schema/userSchema'

describe(':: Service :: CreateUserService ::', () => {
  const next = jest.fn()

  it('should return a user payload', () => {
    const mockedUser = {
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: 'Abcd123/*',
      settings: {
        mfa: {},
      }
    }
    const req = { body: mockedUser } as Request
    const user = CreateUserService.execute(req, next)

    expect(user).toBeDefined()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('settings.theme')
    expect(user).toHaveProperty('settings.animations')
    expect(user).toHaveProperty('settings.notificationType')
    expect(user).toHaveProperty('settings.speechType')
    expect(user).toHaveProperty('settings.publicKey')
    expect(user).toHaveProperty('settings.mfa')
    expect(user).toHaveProperty('settings.backupAccount')
    expect(user).toHaveProperty('settings.buildVersion')
  })

  it('should return a bad request status', () => {
    const mockedUser = {
      name: 'Jane Doe',
      email: '',
      password: 'Abcd123/*',
      settings: {
        mfa: {},
      }
    }

    jest.spyOn(userSchema, 'validate').mockReturnValue({
      error: [{
        message: '"email" is not allowed to be empty',
        path: ['email'], type: 'string.empty',
        context: { value: '', key: 'email', label: 'email' }
      }]
    } as never)

    const req = { body: mockedUser } as Request

    const user = () => {
      CreateUserService.execute(req, next)
    }

    expect(user).toThrow()
  })
})
