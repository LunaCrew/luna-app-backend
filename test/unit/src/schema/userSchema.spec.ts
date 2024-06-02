import userSchema from 'src/schema/userSchema'
import NotificationType from 'src/util/enum/NotificationType'
import SpeechType from 'src/util/enum/SpeechType'
import Theme from 'src/util/enum/Theme'

describe(':: Schema :: UserSchema ::', () => {
  it('should validate a user', () => {
    const user = {
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: 'Abcd123/*',
      settings: {
        theme: Theme.DARK,
        animations: true,
        notificationType: NotificationType.SILENT,
        speechType: SpeechType.NEUTRAL,
        publicKey: 'public-key',
        mfa: {
          mfaToken: 'mfa-token',
          mfaSecret: 'mfa-secret',
          mfaRecoveryCodes: ['code1', 'code2'],
          mfaRecoveryCodesGeneratedAt: '2021-01-01',
          mfaRecoveryCodesUsedAt: '2021-01-01',
          mfaRecoveryCodesRegeneratedAt: '2021-01-01',
          mfaRecoveryCodesUsedCount: 1,
        },
        backupAccount: 'example@example.com',
        buildVersion: 'debug'
      }
    }

    const result = userSchema.validate(user)
    expect(result.error).toBeUndefined()
  })


  it('should return the correct error messages with wrong types', () => {
    const user = {
      name: 12321,
      email: 123123,
      password: 123131,
      settings: {
        theme: 2323131,
        animations: 123132,
        notificationType: 12312313,
        speechType: 123123,
        publicKey: 123123,
        mfa: 123123,
        backupAccount: 123123,
        buildVersion: 123123
      }
    }

    const { error } = userSchema.validate(user, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" must be a string',
      '"email" must be a string',
      '"password" must be a string',
      '"settings.theme" must be one of [dark, light]',
      '"settings.theme" must be a string',
      '"settings.animations" must be a boolean',
      '"settings.notificationType" must be one of [popup, balloon, silent]',
      '"settings.notificationType" must be a string',
      '"settings.speechType" must be one of [male, female, neutral]',
      '"settings.speechType" must be a string',
      '"settings.publicKey" must be a string',
      '"settings.mfa" must be of type object',
      '"settings.backupAccount" must be a string',
      '"settings.buildVersion" must be one of [debug, canary, stable]',
      '"settings.buildVersion" must be a string'
    ]

    expect(error?.details).toHaveLength(15)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct error messages with min values', () => {
    const user = {
      name: 'a',
      email: 'aaaaa',
      password: 'a',
      settings: {},
    }

    const { error } = userSchema.validate(user, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" length must be at least 2 characters long',
      '"email" must be a valid email',
      '"password" length must be at least 8 characters long',
      '"password" must have uppercase and lowercase letters, numbers and special characters',
      '"settings.mfa" is required',
    ]

    expect(error?.details).toHaveLength(5)
    expect(receivedMessages).toEqual(expectedMessages)
  })

  it('should return the correct error messages with max values', () => {
    const user = {
      name: 'a'.repeat(17),
      email: 'aaaaa',
      password: 'a'.repeat(17),
      settings: {},
    }

    const { error } = userSchema.validate(user, { abortEarly: false })
    const receivedMessages = error?.details.map(error => error.message)
    const expectedMessages = [
      '"name" length must be less than or equal to 16 characters long',
      '"email" must be a valid email',
      '"password" length must be less than or equal to 16 characters long',
      '"password" must have uppercase and lowercase letters, numbers and special characters',
      '"settings.mfa" is required',
    ]

    expect(error?.details).toHaveLength(5)
    expect(receivedMessages).toEqual(expectedMessages)
  })
})
