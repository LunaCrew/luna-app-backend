import { NextFunction } from 'express'
import { userParams } from '../../schema/userSchema'
import { UserParams } from '../../types/User'
import { ValidationError } from '../../error/CustomError'

export default function ValidateUser(params: object, next: NextFunction) {
  const { error, value } = userParams.validate(params)
  if (error) {
    next(new ValidationError(error.details.map((detail) => {
      const key = detail.context?.key ?? ''
      return {
        [key]: detail.message
      }
    })))
    next()
  } else {
    return _buildQuery(value)
  }
}

function _buildQuery(params: UserParams): object {
  const query: { $and: Array<object> } = { $and: [] }

  if (params.id) query.$and.push({ _id: params.id })
  if (params.email) query.$and.push({ email: params.email })

  return query
}
