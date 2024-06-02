import { UserService } from 'src/types/Service'

describe('UserService', () => {
  it('should allow object type', () => {
    const user: UserService = { name: 'John', age: 30 }
    expect(user).toMatchObject({ name: 'John', age: 30 })
  })

  it('should allow null type', () => {
    const user: UserService = null
    expect(user).toBeNull()
  })

  it('should allow undefined type', () => {
    const user: UserService = undefined
    expect(user).toBeUndefined()
  })
})
