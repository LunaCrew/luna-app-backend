import { Request } from 'express'
import GetUserService from 'src/service/GetUserService'

describe(':: Service :: GetUserService ::', () => {
  const next = jest.fn()

  it('should return a query using id', () => {
    const id = '4768b952-3904-427c-a855-ebd729b81c85'
    const req = { query: { id: id } } as unknown as Request

    const query = GetUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ '_id': '4768b952-3904-427c-a855-ebd729b81c85' }]
    })
  })

  it('should return a query using email', () => {
    const email = 'jane@example.com'
    const req = { query: { email: email } } as unknown as Request

    const query = GetUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ 'email': 'jane@example.com' }]
    })
  })


  it('should return a query using id and email', () => {
    const id = '4768b952-3904-427c-a855-ebd729b81c85'
    const email = 'jane@example.com'
    const req = { query: { id: id, email: email } } as unknown as Request

    const query = GetUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({
      '$and': [{ '_id': '4768b952-3904-427c-a855-ebd729b81c85' }, { 'email': 'jane@example.com' }]
    })
  })

  it('should fail to return a query using no query parameters', () => {
    const req = { query: {} } as unknown as Request

    GetUserService.execute(req, next)

    expect(next).toHaveBeenCalled()
  })
})
