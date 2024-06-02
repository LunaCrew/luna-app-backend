import { Request, Response, NextFunction } from 'express'
import DeleteUserService from '../../../../src/service/DeleteUserService'

describe('DeleteUserService', () => {
  let req: Request
  let _res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as Request
    _res = {} as Response
    next = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should validate the user', () => {
    req.params = { id: '8fa40850-e31c-448a-9121-815b3cd5582a' }

    const query = DeleteUserService.execute(req, next)

    expect(query).toBeDefined()
    expect(query).toEqual({'$and': [{'_id': '8fa40850-e31c-448a-9121-815b3cd5582a'}]})
  })

  it('should return undefined if the user is not valid', () => {
    req.params = { id: '8fa40850' }

    const query = DeleteUserService.execute(req, next)

    expect(next).toHaveBeenCalledTimes(2)
    expect(query).toBeUndefined()
  })
})

